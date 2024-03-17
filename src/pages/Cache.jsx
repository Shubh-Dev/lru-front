import React, { useState, useEffect } from "react";
import CacheItem from "../components/CacheItem";

const Cache = ({ cacheData: initialCacheData }) => {
  const [loading, setLoading] = useState(true);
  const [selectedCacheKey, setSelectedCacheKey] = useState(null);
  useEffect(() => {
    // If initial cache data is provided, set it immediately
    if (initialCacheData) {
      setLoading(false);
    } else {
      fetch("https://lru-cache.onrender.com/")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch cache data");
          }
          return response.json();
        })
        .then((data) => {
          initialCacheData = data;
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching cache data:", error);
          // Set loading to false
          setLoading(false);
        });
    }
  }, [initialCacheData]);

  const handleCacheItemClick = (key) => {
    setSelectedCacheKey(key);
    console.log("selected key", key);
  };

  return (
    <div>
      <div className="border border-gray-600 p-6">
        <h2 className="text-2xl">Cache</h2>
        {loading && <p className="text-xs">Loading cache data...</p>}
        {!loading && (
          <div>
            {Object.keys(initialCacheData || {}).length === 0 ? (
              <p>Cache is empty</p>
            ) : (
              <ul>
                {Object.keys(initialCacheData).map((key) => (
                  <li
                    key={key}
                    onClick={() => handleCacheItemClick(key)}
                    className="cursor-pointer text-lg mt-2 text-blue-300"
                  >
                    Key: {key}, Value: {initialCacheData[key]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="border border-gray-600 p-6 mt-6">
        <h2 className="text-2xl">Selected Cache Item</h2>
        {selectedCacheKey && <CacheItem cacheKey={selectedCacheKey} />}

        {!selectedCacheKey && <p>No cache item selected</p>}

        <button
          onClick={() => setSelectedCacheKey(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Cache;
