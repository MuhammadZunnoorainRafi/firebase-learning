import { z } from 'zod';

export const LogSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const PostSchema = z.object({
  image: z.string().min(1, 'Image is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce
    .number({
      invalid_type_error: 'Price must be in numbers',
      required_error: 'Price is required',
    })
    .min(1, 'Price is required'),
  stars: z.string().min(1, 'Star is required'),
});
