import React from "react";
import { useState, useEffect } from "react";

const Visitorcount = () => {
  const [count, setCount] = useState(0);

  // Function to fetch visitor count
  const fetchAPI = async () => {
    try {
      // Replace this URL with your Azure Function URL
      const functionUrl = 'https://quan-cloud-resume.azurewebsites.net/api/api/getvisitorcounter?';
      console.log('Making request to:', functionUrl);
      
      const response = await fetch(functionUrl, {
        method: 'GET', // Changed to GET since that's how we set up our Azure Function
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching visitor count:', error);
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