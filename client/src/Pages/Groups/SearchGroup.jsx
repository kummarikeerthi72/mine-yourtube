import React, { useState } from "react";
import axios from "axios";

// Helper function to extract userId from JWT
const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.id || payload._id || payload.userId; // Depending on backend structure
  } catch (err) {
    console.error("Token decode error:", err.message);
    return null;
  }
};

const SearchGroup = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchGroups = async () => {
    try {
      const res = await axios.get(
        `https://mine-yourtube.onrender.com/api/group/search?name=${query}`
      );
      setResults(res.data || []);
    } catch (err) {
      console.error("Search error:", err.response?.data || err.message);
      alert("Group search failed");
    }
  };

  const joinGroup = async (groupId) => {
    const token = localStorage.getItem("token");
    const userId = getUserIdFromToken();

    if (!token || !userId) {
      alert("You must be logged in to join a group.");
      return;
    }

    try {
      await axios.put(
        `https://mine-yourtube.onrender.com/api/group/${groupId}/add`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Joined group successfully!");
    } catch (err) {
      console.error("Join group error:", err.response?.data || err.message);
      alert("Failed to join group");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Search Groups</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter group name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border w-full px-3 py-2 rounded"
        />
        <button
          onClick={searchGroups}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>
      <ul>
        {results.length > 0 ? (
          results.map((group) => (
            <li key={group._id} className="mb-2 border p-2 rounded shadow">
              <h3 className="font-semibold">{group.name}</h3>
              <p className="text-sm text-gray-700">{group.description}</p>
              <button
                onClick={() => joinGroup(group._id)}
                className="text-sm mt-2 text-blue-600 underline"
              >
                Join Group
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No groups found.</p>
        )}
      </ul>
    </div>
  );
};

export default SearchGroup;
