import { z } from 'zod';

export const assignTaskSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be at most 500 characters'),
  user: z.string().nonempty('Please select a user'),
});

export type AssignTaskForm = z.infer<typeof assignTaskSchema>;
