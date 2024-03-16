import React, { useState, useEffect } from "react";

const Cache = () => {
  const [cacheData, setCacheData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://lru-cache.onrender.com/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch cache data");
        }
        return response.json();
      })
      .then((data) => {
        // Update cache data state
        setCacheData(data);
        // Set loading to false
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cache data:", error);
        // Set loading to false
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Cache</h2>
      {loading && <p>Loading cache data...</p>}
      {!loading && (
        <div>
          {Object.keys(cacheData).length === 0 ? (
            <p>Cache is empty</p>
          ) : (
            <ul>
              {Object.keys(cacheData).map((key) => (
                <li key={key}>
                  Key: {key}, Value: {cacheData[key]}, Expiry:
                  {cacheData[key].expiry}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Cache;
