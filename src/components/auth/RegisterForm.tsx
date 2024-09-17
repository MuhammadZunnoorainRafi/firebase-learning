import { useState } from 'react';
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

import { register } from '@/actions/auth/auth';
import { RegSchema } from '@/utils/schemas';
import { RegType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../shared/ErrorMessage';
import CardWrapper from './CardWrapper';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<RegType>({
    resolver: zodResolver(RegSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const formSubmit = async (formData: RegType) => {
    setErrorMessage('');
    const { name, email, password } = formData;
    try {
      setIsLoading(true);
      const res = await register(name, email, password);

      if (res.error) {
        setErrorMessage(res.error);
        return;
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome to Register screen"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            disabled={isLoading}
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
            disabled={isLoading}
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
          <Button disabled={isLoading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
        <ErrorMessage message={errorMessage} />
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
