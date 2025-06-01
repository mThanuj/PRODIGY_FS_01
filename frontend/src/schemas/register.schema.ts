import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required' })
    .max(256, { message: 'Name must be at most 256 characters' }),
  email: z
    .string()
    .nonempty({ message: 'Email is required' })
    .email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .nonempty({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  remember: z.boolean().optional(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
