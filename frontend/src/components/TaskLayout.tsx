import React from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import axiosInstance from '../config/axios.config';

const TaskLayout: React.FC = () => {
  const { user } = useOutletContext<{
    user: { id: string; email: string; role: string } | null;
  }>();

  const logout = async () => {
    try {
      await axiosInstance.get('/auth/logout');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">Task Manager</div>
          <div className="space-x-6">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <main className="flex-1 px-4 py-8 flex items-center justify-center">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default TaskLayout;
