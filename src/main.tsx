import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home from './pages/home/page.tsx';
import Login from './pages/login/page.tsx';
import Register from './pages/register/page.tsx';
import Profile from './pages/profile/page.tsx';
import Post from './pages/post/page.tsx';
import MyPhotos from './pages/my-photos/page.tsx';
import { AuthContextProvider } from './context/AuthContext.tsx';
import ProtectRoute from './utils/ProtectRoute.tsx';
import ResetPassword from './components/auth/ResetPassword.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="/" element={<ProtectRoute />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post" element={<Post />} />
        <Route path="my-photos" element={<MyPhotos />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
