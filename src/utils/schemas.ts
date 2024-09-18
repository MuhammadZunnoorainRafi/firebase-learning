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

export const PostSchema = z
  .object({
    imageUrls: z.array(z.string()).optional(),
    imageFiles: z
      .instanceof(FileList, { message: 'Image is required' })
      .optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    category: z.string().min(1, 'Category is required'),
    star: z.string().min(1, 'Star is required'),
    price: z.coerce
      .number({
        invalid_type_error: 'Price must be in numbers',
      })
      .min(1, 'Price is required'),
  })
  .refine((val) => val.imageUrls || val.imageFiles, {
    message: 'Select atleast one image',
    path: ['imageFiles'],
  });
