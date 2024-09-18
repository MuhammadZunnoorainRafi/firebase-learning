import { z } from 'zod';
import { LogSchema, PostSchema, RegSchema } from './schemas';

export type LogType = z.infer<typeof LogSchema>;
export type RegType = z.infer<typeof RegSchema>;
export type PostType = z.infer<typeof PostSchema>;

export type Post = {
  userId: string;
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrls: string[];
  star: string;
  date: Date;
};
