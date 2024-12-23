import azure.functions as func
import logging
import json
from azure.cosmos import CosmosClient
import os
from datetime import datetime, timezone

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="getvisitorcounter")
def getvisitorcounter(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Processing visitor counter request.')
    logging.info('Visitor counter function triggered')
    logging.info(f'Request method: {req.method}')
    logging.info(f'Request headers: {req.headers}')
    logging.info(f'Received route: {req.route_params}')
    try:
        # Initialize Cosmos DB client
        url = os.environ["COSMOS_DB_URL"]
        key = os.environ["COSMOS_DB_KEY"]
        database_name = os.environ["COSMOS_DB_DATABASE"]
        container_name = os.environ["COSMOS_DB_CONTAINER"]
        
        client = CosmosClient(url, credential=key)
        database = client.get_database_client(database_name)
        container = database.get_container_client(container_name)

        # Get current timestamp in UTC
        current_time = datetime.now(timezone.utc).isoformat()

        # Query the current counter document
        query = "SELECT * FROM c WHERE c.id = 'visitor_count'"
        items = list(container.query_items(query=query, enable_cross_partition_query=True))
        
        if not items:
            # If no counter exists, create one
            counter = {
                'id': 'visitor_count',
                'count': 1,
                'last_visited': current_time,
                'visits': [{
                    'timestamp': current_time,
                    'count': 1
                }]
            }
            container.create_item(body=counter)
            current_count = 1
        else:
            # Increment existing counter
            current_item = items[0]
            current_count = current_item['count'] + 1
            current_item['count'] = current_count
            current_item['last_visited'] = current_time
            
            # Add new visit to the visits array
            if 'visits' not in current_item:
                current_item['visits'] = []
            current_item['visits'].append({
                'timestamp': current_time,
                'count': current_count
            })
            
            container.upsert_item(current_item)
        
        # Return only the count in the response
        return func.HttpResponse(
            body=json.dumps({
                "count": current_count
            }),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logging.error(f'Error: {str(e)}')
        return func.HttpResponse(
            body=json.dumps({
                "error": str(e),
                "message": "Failed to update counter"
            }),
            mimetype="application/json",
            status_code=500
        )