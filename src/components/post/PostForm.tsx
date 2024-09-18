import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Post, PostType } from '@/utils/types';
import { PostSchema } from '@/utils/schemas';
import { Textarea } from '../ui/textarea';
import { useAuthContext } from '@/context/AuthContext';
import { imageUpload } from './imageUpload';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase.config';

type Props = {
  post?: Post;
};

function PostForm({ post }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  const form = useForm<PostType>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      imageUrls: post ? post.imageUrls : undefined,
      title: post ? post.title : '',
      description: post ? post.description : '',
      category: post ? post.category : '',
      star: post ? post.star : '',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      price: (post ? post.price : '') as any,
    },
  });

  const formSubmit = async (formData: PostType) => {
    try {
      setIsLoading(true);
      const { category, description, star, price, title, imageFiles } =
        formData;
      if (!user) {
        console.log('user not found');
        return;
      }
      //  TODO: create product login
      let imageUrls = undefined;
      if (imageFiles) {
        imageUrls = await Promise.all(
          [...imageFiles].map((image) => imageUpload(image, user))
        );
        console.log({ imageUrls });
      }

      await addDoc(collection(db, 'posts'), {
        userId: user.uid,
        title,
        description,
        category,
        star,
        price,
        imageUrls,
        timestamp: serverTimestamp(),
      });
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(form.getValues('imageFiles'));

  return (
    <Card className="max-w-6xl mx-auto mt-4 mb-2">
      <CardHeader className="py-1">
        <CardTitle className="py-2">
          {post ? 'Edit post' : 'Create post'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
            className="flex  items-start justify-between gap-1"
          >
            <FormField
              control={form.control}
              name="imageFiles"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="file"
                      multiple={true}
                      placeholder="Images"
                      accept=".jpg, .jpeg, .png"
                      onChange={(event) =>
                        field.onChange(
                          event.target.files ? event.target.files : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="shirt">Shirt</SelectItem>
                      <SelectItem value="pant">Pant</SelectItem>
                      <SelectItem value="jacket">Jacket</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="star"
              render={({ field }) => (
                <FormItem>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select start rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {post ? 'Update' : 'Submit'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PostForm;
