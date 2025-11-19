
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Page Not Found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;

