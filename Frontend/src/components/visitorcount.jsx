import React from "react";
import { useState, useEffect } from "react";

const Visitorcount = () => {
  const [count, setCount] = useState(0);

  const fetchAPI = async () => {
    try {
      // Log the full environment variable
      console.log('Full env:', import.meta.env);
      
      const functionUrl = `${import.meta.env.VITE_AZURE_FUNCTION_URL}/api/getvisitorcounter`;
      console.log('Computed function URL:', functionUrl);
      
      // Try a direct fetch to verify the URL
      const response = await fetch(functionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response object:', response);
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      const text = await response.text();
      console.log('Raw response text:', text);
      
      const data = JSON.parse(text);
      console.log('Parsed response data:', data);
      setCount(data.count);
    } catch (error) {
      console.error('Complete error details:', error);
    }
  };

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