import React, { useState, useEffect } from "react";

const CacheItem = ({ cacheKey }) => {
  const [countdown, setCountdown] = useState(0);
  const [cachedData, setCachedData] = useState(null);
  const [expiryIndianTime, setExpiryIndianTime] = useState("");

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://lru-cache.onrender.com/cache/get?key=${cacheKey}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data", data);
        setCachedData(data);
        const expiryIST = new Date(data.expiry + " UTC");
        const expiryTime = expiryIST.getTime() - Date.now();
        setCountdown(expiryTime / 1000);

        const indianTime = expiryIST.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        setExpiryIndianTime(indianTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [cacheKey]);
  3;
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  console.log("countdown", countdown);

  return (
    <div>
      {cachedData && (
        <>
          <ul>
            <li className="text-blue-300 text-lg">Key: {cachedData.key}</li>
            <li className="text-blue-300 text-lg">Value: {cachedData.value}</li>
            <li className="text-blue-300 text-lg">
              Expiry: {expiryIndianTime}
            </li>
            <li>
              {countdown > 0 && (
                <p className="text-blue-300 boeder border-white">
                  Expires in: {formatTime(countdown)} (MM:SS)
                </p>
              )}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default CacheItem;
