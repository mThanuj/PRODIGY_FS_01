import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '../config/axios.config';
import {
  assignTaskSchema,
  type AssignTaskForm,
} from '../schemas/assignTask.schema';

const AssignTask: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AssignTaskForm>({
    resolver: zodResolver(assignTaskSchema),
  });

  const [users, setUsers] = useState<
    { _id: string; name: string; email: string }[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data.users);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, []);

  const onSubmit = async (data: AssignTaskForm) => {
    try {
      await axiosInstance.post('/tasks/create-task', {
        title: data.title,
        description: data.description,
        user: data.user,
      });
      reset();
      alert('Task assigned successfully!');
    } catch (err) {
      console.error('Error assigning task:', err);
      alert('Failed to assign task. Please try again.');
    }
  };

  return (
    <div className="h-full w-full bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Assign a New Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register('title')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register('description')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter task description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="assignedUserId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Assign To
            </label>
            <select
              id="assignedUserId"
              {...register('user')}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.user ? 'border-red-500' : 'border-gray-300'
              }`}
              defaultValue=""
            >
              <option value="" disabled>
                Select a user
              </option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.user && (
              <p className="text-red-500 text-sm mt-1">{errors.user.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Assigning...' : 'Assign Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
