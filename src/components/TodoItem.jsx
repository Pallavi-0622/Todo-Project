import React, { useState } from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    if (editedText.trim()) {
      updateTodo(todo.id, editedText);
    }
    setIsEditing(false);
  };

  const handleStatusToggle = () => {
    const newStatus =
      (todo.status || "in_progress") === "completed"
        ? "in_progress"
        : "completed";
    toggleComplete(todo.id, newStatus);
  };

  const getStatusBadge = (status = "in_progress") => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const status = todo.status || "in_progress";

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border rounded-lg p-4 mb-3 shadow hover:shadow-md transition-all">

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <div className="flex items-start gap-3 w-full sm:w-auto">
            
            <input
              type="checkbox"
              checked={status === "completed"}
              onChange={handleStatusToggle}
              className="mt-1 h-4 w-4 accent-indigo-600"
            />

            {isEditing ? (
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
                className="px-3 py-1 border border-gray-300 rounded-md text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <span
                onDoubleClick={() => setIsEditing(true)}
                className={`cursor-pointer text-sm break-words ${
                  status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(
                status
              )}`}
            >
              {status.replace("_", " ").toUpperCase()}
            </span>
            <span className="text-xs text-gray-400">{todo.timestamp}</span>
          </div>
        </div>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-500 hover:text-red-600 text-xs font-medium mt-2 sm:mt-0 flex items-center gap-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
