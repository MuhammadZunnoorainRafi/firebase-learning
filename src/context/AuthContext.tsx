import { auth } from '@/firebase.config';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setIsError(true);
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user, isLoading, isLoggedIn: !isError }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context as AuthContext;
};
