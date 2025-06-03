import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axiosInstance from '../config/axios.config';
import Loading from '../components/Loading';

interface Task {
  _id: string;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
}

const ViewTasks: React.FC = () => {
  const { user } = useOutletContext<{
    user: { id: string; email: string; role: string } | null;
  }>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await axiosInstance.get<{ tasks: Task[] }>(
          `/tasks/${user.id}`,
        );
        setTasks(response.data.tasks);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const completeTask = async (taskId: string) => {
    if (updatingIds.has(taskId)) return;

    setUpdatingIds((prev) => new Set(prev).add(taskId));
    try {
      await axiosInstance.patch(`/tasks/complete-task/${taskId}`);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, isDone: true } : t)),
      );
    } catch (err) {
      console.error(`Error completing task ${taskId}:`, err);
      alert('Failed to complete task. Please try again.');
    } finally {
      setUpdatingIds((prev) => {
        const copy = new Set(prev);
        copy.delete(taskId);
        return copy;
      });
    }
  };

  if (loading) {
    return <Loading text="Loading tasks..." />;
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
    <div className="min-h-screen w-full bg-gray-50 py-8 px-4">
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

                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </span>

                    {!task.isDone && (
                      <button
                        onClick={() => completeTask(task._id)}
                        disabled={updatingIds.has(task._id)}
                        className={`
                          ml-4 px-4 py-2 rounded-lg text-white font-medium transition
                          ${
                            updatingIds.has(task._id)
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300'
                          }
                        `}
                      >
                        {updatingIds.has(task._id)
                          ? 'Completing...'
                          : 'Mark as Complete'}
                      </button>
                    )}
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
