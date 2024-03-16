import React, { useState, useEffect } from "react";

const CacheItem = ({ cacheItem }) => {
  const [countdown, setCountdown] = useState(cacheItem.expiry);
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
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <div onClick={() => onClick(cacheItem)}>
      <h2>Cache Item</h2>
      <p>
        Key: {cacheItem.key}, Value: {cacheItem.value}, Expiry:{" "}
      </p>
        {countdown > 0 && <p>Expires in: {formatTime(countdown)}(MM:SS)</p>}
    </div>
  );
};
export default CacheItem;
