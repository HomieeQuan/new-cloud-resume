import azure.functions as func
import logging
import json

app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

# For now, we'll use a simple variable (this will reset on function restart)
# Later we'll replace this with CosmosDB
visit_count = 0

@app.route(route="getvisitorcounter")
def getvisitorcounter(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Visitor counter function processed a request.')
    
    global visit_count
    visit_count += 1
    
    response_data = {
        "count": visit_count,
        "message": "Counter incremented successfully"
    }
    
    return func.HttpResponse(
        body=json.dumps(response_data),
        mimetype="application/json",
        status_code=200
    )