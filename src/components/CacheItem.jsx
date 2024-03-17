import React, { useState, useEffect } from "react";

const CacheItem = ({ cacheKey }) => {
  const [countdown, setCountdown] = useState(0);
  const [cachedData, setCachedData] = useState(null);
  console.log("cacheKey", cacheKey);

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
        setCachedData(data);
        setCountdown(data.expiry);
        const expiryTime = new Date(data.expiry).getTime();
        const currentTime = new Date().getTime();
        const remainingTime = expiryTime - currentTime;
        console.log("countdown", countdown);
        if (remainingTime > 0) {
          setCountdown(Math.floor(remainingTime / 1000)); // Convert milliseconds to seconds
          timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [cacheKey]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      {cachedData && (
        <>
          <ul>
            <li className="text-blue-300 text-lg">Key: {cachedData.key}</li>
            <li className="text-blue-300 text-lg">Value: {cachedData.value}</li>
            <li className="text-blue-300 text-lg">
              Expiry: {cachedData.expiry}
            </li>
            <li>
              {countdown > 0 && (
                <p className="text-blue-300 boeder border-white" >
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

// import React, { useState, useEffect } from "react";

// const CacheItem = ({ key, value }) => {
//   const [countdown, setCountdown] = useState(cacheItem.expiry);
//   useEffect(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setInterval(() => {
//         setCountdown((prevCountdown) => prevCountdown - 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [countdown]);

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };
//   return (
//     <div onClick={() => onClick(cacheItem)}>
//       <h2>Cache Item</h2>
//       <p>
//         Key: {key}, Value: {value}
//       </p>
//       {countdown > 0 && <p>Expires in: {formatTime(countdown)}(MM:SS)</p>}
//     </div>
//   );
// };
// export default CacheItem;
