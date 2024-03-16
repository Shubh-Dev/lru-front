import React, { useState } from "react";

const AddCache = ({ onSetCache }) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [expiry, setExpiry] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expiryNumber = Number(expiry);
    if (isNaN(expiryNumber) || expiryNumber < 0) {
      return;
    }
    const cache = { key, value, expiry: expiryNumber };
    onSetCache(cache);
    setKey("");
    setValue("");
    setExpiry("");
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-xl mb-4">Add Cache</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="key" className="block">
            Key:
          </label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-1"
          />
        </div>
        <div>
          <label htmlFor="value" className="block">
            Value:
          </label>
          <input
            type="text"
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-1"
          />
        </div>
        <div>
          <label htmlFor="expiry" className="block">
            Expiry (seconds):
          </label>
          <input
            type="number"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 p-1"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mt-2"
        >
          Set Cache
        </button>
      </form>
    </div>
  );
};

export default AddCache;
