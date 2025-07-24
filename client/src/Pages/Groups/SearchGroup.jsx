import React, { useState } from "react";
import axios from "axios";

const SearchGroup = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/group/search?name=${query}`
      );
      setResults(res.data);
    } catch (err) {
      console.log("Search error:", err);
    }
  };

  const joinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");
     await axios.put(
  `http://localhost:5000/api/group/${groupId}/add`,
  { userId: "YOUR_USER_ID" },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("Joined group successfully");
    } catch (err) {
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
          onClick={search}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search
        </button>
      </div>
      <ul>
        {results.map((group) => (
          <li key={group._id} className="mb-2 border p-2 rounded shadow">
            <h3 className="font-semibold">{group.name}</h3>
            <p className="text-sm">{group.description}</p>
            <button
              onClick={() => joinGroup(group._id)}
              className="text-sm mt-2 text-blue-600 underline"
            >
              Join Group
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchGroup;
