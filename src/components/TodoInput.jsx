import React, { useState } from "react";

const TodoInput = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("in_progress");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text, status);
      setText("");
      setStatus("in_progress");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {/* Task Input */}
        <input
          type="text"
          placeholder="Enter a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400"
        />

        {/* Status Dropdown */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
        >
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition text-sm shadow-sm"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
