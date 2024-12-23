import React from "react";
import { useState, useEffect } from "react";

const Visitorcount = () => {
  const [count, setCount] = useState(0);

  const fetchAPI = async () => {
    try {
      const functionUrls = [
        `https://quan-cloud-resume.azurewebsites.net/api/getvisitorcounter`,
        `https://quan-cloud-resume.azurewebsites.net/api/test`,
        `/api/getvisitorcounter`
      ];
  
      for (const url of functionUrls) {
        try {
          console.log(`Attempting to fetch from: ${url}`);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          });
          
          console.log(`Response from ${url}:`, {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries())
          });
  
          if (response.ok) {
            const text = await response.text();
            console.log('Raw response text:', text);
            const data = JSON.parse(text);
            console.log('Parsed response data:', data);
            
            if (data.count !== undefined) {
              setCount(data.count);
            }
            return;
          }
        } catch (fetchError) {
          console.error(`Error fetching from ${url}:`, fetchError);
        }
      }
  
      throw new Error('Could not fetch visitor count from any URL');
    } catch (error) {
      console.error('Complete error details:', error);
    }
  };

  // Fetch count when component mounts
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="px-3 py-2 text-sm text-white bg-gray-900 bg-opacity-80 rounded-md hover:bg-opacity-100 transition-all duration-300">
      Number of Visitors: {count}
    </div>
  );
};

export default Visitorcount;