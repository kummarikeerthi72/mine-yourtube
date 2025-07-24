import React, { useState } from "react";
import axios from "axios";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    const groupData = { name, description };

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://mine-yourtube.onrender.com/api/group/create",
        groupData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Group created successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error creating group");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Group</h2>
      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          placeholder="Group Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full px-3 py-2 rounded"
          required
        />
        <textarea
          placeholder="Group Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border w-full px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default CreateGroup;
