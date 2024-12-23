import React from "react";
import { useState, useEffect } from "react";

const Visitorcount = () => {
  const [count, setCount] = useState(0);

  const fetchAPI = async () => {
    try {
      const functionUrl = `${import.meta.env.VITE_AZURE_FUNCTION_URL}?code=${import.meta.env.VITE_AZURE_FUNCTION_KEY}`;
      const response = await fetch(functionUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error('Error fetching visitor count:', error);
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