import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log("Updated user data:", formData);
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4 text-primary">
        My Profile
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Picture */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
          <img
            src={formData.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Info or Form */}
        <div className="flex-1">
          {!isEditing ? (
            <>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Name:</span> {formData.displayName || "User"}
              </p>
              <p className="text-lg font-medium text-gray-800 mt-2">
                <span className="font-semibold">Email:</span> {formData.email || "N/A"}
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-medium">
                  Photo URL
                </label>
                <input
                  type="text"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded-md"
                />
              </div>

              <div className="flex gap-4 mt-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Edit button */}
      {!isEditing && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default MyProfile;

