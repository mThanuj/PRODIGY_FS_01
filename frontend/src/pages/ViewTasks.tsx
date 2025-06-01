import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../config/axios.config';

interface Task {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
}

const ViewTasks: React.FC = () => {
  const { user } = useOutletContext<{
    user: { id: string; email: string; role: string };
  }>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/tasks/${user.id}`);
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Your Tasks
        </h2>
        {tasks.length === 0 ? (
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <p className="text-gray-500">No tasks assigned to you yet.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task._id}>
                <div className="bg-white shadow-md rounded-2xl p-6 transition hover:shadow-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium text-gray-800">
                        {task.title}
                      </h3>
                      <p className="text-gray-600 mt-2">{task.description}</p>
                    </div>
                    <span
                      className={`
                        text-sm font-semibold px-3 py-1 rounded-full
                        ${
                          task.isDone
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }
                      `}
                    >
                      {task.isDone ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>
                      {new Date(task.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        minute: '2-digit',
                        hour: '2-digit',
                        second: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
