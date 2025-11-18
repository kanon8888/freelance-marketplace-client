import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Accepted Tasks
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/acceptedTasks?userEmail=${user.email}`)
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        toast.error("Failed to load tasks");
        setLoading(false);
      });
  }, [user]);

  // Common Delete Function
  const deleteTask = async (id, message) => {
    try {
      await axios.delete(`http://localhost:3000/acceptedTasks/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success(message);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task");
    }
  };

  // DONE Button
  const handleDone = (id) => {
    deleteTask(id, "✅ Task marked as DONE!");
  };

  // CANCEL Button
  const handleCancel = (id) => {
    deleteTask(id, "❌ Task cancelled!");
  };

  if (loading) {
    return (
      <div className="text-center py-10 font-semibold text-lg">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <h1 className="text-2xl font-bold text-center mb-6">
        My Accepted Tasks
      </h1>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No accepted tasks found!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition"
            >
              <img
                src={task.coverImage}
                alt={task.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-600">{task.category}</p>
              <p className="text-sm text-gray-500 mb-2">
                Posted by: {task.postedBy}
              </p>
              <p className="text-sm text-gray-500">
                {task.summary?.slice(0, 80)}...
              </p>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleDone(task._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  ✅ DONE
                </button>

                <button
                  onClick={() => handleCancel(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  ❌ CANCEL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAcceptedTasks;

