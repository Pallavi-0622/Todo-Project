import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PieChartComponent from "./components/PieChartComponent";
import { LogOut } from "lucide-react";
import {
  deleteTodo as deleteTodoAction,
  setTaskText,
  setTodos,
} from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TODO } from "./redux/actions";

const FILTERS = ["All", "Open", "In Progress", "Completed", "Cancelled"];

const App = () => {
  const todos = useSelector((state) => state.todos);
  const taskText = useSelector((state) => state.taskText);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedStatus, setEditedStatus] = useState("open");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch(setTodos(JSON.parse(savedTodos)));
    }
  }, [dispatch]);

  const userName = user?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login", { replace: true }); 
  };

  const addTodo = () => {
    if (taskText?.trim()) {
      const newTodo = {
        id: Date.now(),
        text: taskText,
        status: "open",
        timestamp: Date.now(),
      };
      dispatch({ type: ADD_TODO, payload: newTodo });
    }
  };

  const deleteTodo = (id) => {
    dispatch(deleteTodoAction(id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Open") return todo.status === "open";
    if (filter === "Completed") return todo.status === "completed";
    if (filter === "In Progress") return todo.status === "in_progress";
    if (filter === "Cancelled") return todo.status === "cancelled";
    return true;
  });

  const completedCount = todos.filter((t) => t.status === "completed").length;
  const inprogressCount = todos.filter((t) => t.status === "in_progress").length;
  const cancelledCount = todos.filter((t) => t.status === "cancelled").length;
  const openCount = todos.filter((t) => t.status === "open").length;

  const statusColors = {
    All: "bg-indigo-600 text-white",
    Open: "bg-gray-200 text-gray-800",
    "In Progress": "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-800",
    Cancelled: "bg-red-200 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">To-Do Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 font-medium">
            Welcome,{" "}
            <span className="font-semibold text-indigo-600">{userName}</span>
          </span>
          <button
            onClick={handleLogout}
            title="Logout"
            className="text-red-600 hover:text-red-800 transition"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        <Card title="All Tasks" count={todos.length} color="blue" />
        <Card title="Open" count={openCount} color="gray" />
        <Card title="In Progress" count={inprogressCount} color="yellow" />
        <Card title="Completed" count={completedCount} color="green" />
        <Card title="Cancelled" count={cancelledCount} color="red" />
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {FILTERS.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              statusColors[tab]
            } ${filter === tab ? "ring-2 ring-offset-1 ring-indigo-400" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex gap-3 flex-col sm:flex-row">
          <input
            type="text"
            value={taskText}
            onChange={(e) => dispatch(setTaskText(e.target.value))}
            placeholder="Enter new task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition text-sm shadow-sm"
          >
            + Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-1/3 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Task Name
              </th>
              <th className="w-1/3 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="w-1/3 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTodos.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  ) : (
                    todo.text
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === todo.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        todo.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : todo.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : todo.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {todo.status.replace("_", " ").toUpperCase()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2 relative">
                  {editingId === todo.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          dispatch(
                            setTodos(
                              todos.map((t) =>
                                t.id === todo.id
                                  ? {
                                      ...t,
                                      text: editedText,
                                      status: editedStatus,
                                    }
                                  : t
                              )
                            )
                          );
                          setEditingId(null);
                          setDropdownOpen(null);
                        }}
                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setDropdownOpen(null);
                        }}
                        className="text-sm text-gray-500 px-3 py-1"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === todo.id ? null : todo.id
                          )
                        }
                        className="text-sm text-gray-700 px-2 py-1 border border-gray-300 rounded hover:bg-gray-100"
                      >
                        ⋮
                      </button>
                      {dropdownOpen === todo.id && (
                        <div className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                          <button
                            onClick={() => {
                              setEditedText(todo.text);
                              setEditedStatus(todo.status);
                              setEditingId(todo.id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteTodo(todo.id);
                              setDropdownOpen(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-2 mb-2">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Task Status Distribution
        </h2>
        <PieChartComponent
          data={{
            open: openCount,
            in_progress: inprogressCount,
            completed: completedCount,
            cancelled: cancelledCount,
          }}
        />
      </div>
    </div>
  );
};

const Card = ({ title, count, color }) => (
  <div className="bg-white shadow-md rounded-lg p-4 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-2xl font-bold text-${color}-600`}>{count}</p>
  </div>
);

export default App;
