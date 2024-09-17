import { login } from '@/actions/auth/auth';
import { LogSchema } from '@/utils/schemas';
import { LogType } from '@/utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../shared/ErrorMessage';
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
import Socials from './Socials';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LogType>({
    resolver: zodResolver(LogSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const formSubmit = async (formData: LogType) => {
    setErrorMessage('');
    const { email, password } = formData;
    try {
      setIsLoading(true);
      const res = await login(email, password);
      if (!res.user) {
        setErrorMessage('Not Logged In, please try later.');
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
      headerLabel="Welcome to login screen!"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-4">
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
          <Link
            className="text-blue-500 hover:underline mt-1"
            to="/reset-password"
          >
            Forgot password?
          </Link>
          <Button disabled={isLoading} className="w-full" type="submit">
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
