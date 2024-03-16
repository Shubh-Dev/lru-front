import React, { useState, useEffect } from "react";
import "./App.css";
import Cache from "./pages/Cache";
import AddCache from "./components/AddCache";

function App() {
  const [cacheData, setCacheData] = useState(null);
  const fetchCacheData = async () => {
    try {
      const response = await fetch("https://lru-cache.onrender.com/");
      if (!response.ok) {
        throw new Error("Failed to fetch cache data");
      }
      const data = await response.json();
      setCacheData(data);
    } catch (error) {
      console.error("Error fetching cache data:", error);
    }
  };

  useEffect(() => {
    fetchCacheData();
  }, []);

  const handleSetCache = async (cache) => {
    try {
      const response = await fetch("https://lru-cache.onrender.com/cache/set", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cache),
      });
      console.log("cache expiry", cache.expiry);
      if (!response.ok) {
        throw new Error("Failed to set cache data");
      }
      fetchCacheData();
    } catch (error) {
      console.error("Error setting cache data:", error);
    }
  };

  return (
    <div className="flex  justify-around mt-6">
      <div>
        <Cache cacheData={cacheData} />
      </div>
      <div className="border border-gray-600 p-6">
        <AddCache onSetCache={handleSetCache} />
      </div>
    </div>
  );
}

export default App;
