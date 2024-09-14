'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import CardWrapper from './CardWrapper';
import { LogType } from '@/utils/types';
import { LogSchema } from '@/utils/schemas';
import ErrorMessage from '../shared/ErrorMessage';
import { login } from '@/actions/auth/auth';
import Socials from './Socials';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<LogType>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formSubmit = async (formData: LogType) => {
    const { email, password } = formData;
    setErrorMessage('');
    startTransition(async () => {
      const res = await login(email, password);
      if (!res.user) {
        setErrorMessage('Not Logged In, please try later.');
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome to login screen!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            disabled={isPending}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <div>
          <Socials />
        </div>
        <ErrorMessage message={errorMessage} />
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
