import { useState, useEffect } from 'react';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Secure Login System
        </h1>
        
        {isLoggedIn ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-medium">
              ✅ You are securely logged in
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <p className="text-gray-600 text-center">
              Please authenticate to continue
            </p>
            <a
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-center transition duration-200"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded text-center transition duration-200"
            >
              Create Account
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;