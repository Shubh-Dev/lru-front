import "./App.css";
import Cache from "./pages/Cache";
import AddCache from "./components/AddCache";

function App() {
  const handleSetCache = async (cache) => {
    // cache.expiry = Number(cache.expiry);
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

      const data = await response.json();
      console.log("Cache set successfully:", data);
    } catch (error) {
      console.error("Error setting cache data:", error);
    }
  };

  return (
    <div className="flex  justify-around mt-6">
      <div className="border border-gray-600 p-6">
        <Cache />
      </div>
      <div className="border border-gray-600 p-6">
        <AddCache onSetCache={handleSetCache} />
      </div>
    </div>
  );
}

export default App;
