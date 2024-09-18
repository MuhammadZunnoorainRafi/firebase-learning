import { Link, NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuthContext } from '@/context/AuthContext';
import UserButton from '../auth/UserButton';

const navlinks = [
  { href: '/post', name: 'Post' },
  { href: '/my-photos', name: 'My Photos' },
  { href: '/profile', name: 'Profile' },
];

function Navbar() {
  const { user, isLoading } = useAuthContext();
  return (
    <div className="px-10 py-3 flex items-center justify-between border-b">
      <Button asChild variant="ghost" className="font-bold text-lg">
        <Link to="/">🔥 Firebase</Link>
      </Button>
      <div className="flex items-center justify-center gap-5">
        {navlinks.map((val, ind) => (
          <NavLink
            to={val.href}
            key={ind}
            className={({ isActive }) =>
              isActive
                ? 'font-bold underline underline-offset-2'
                : 'font-semibold hover:text-white'
            }
          >
            {val.name}
          </NavLink>
        ))}
      </div>
      {isLoading ? (
        <p className="text-blue-300">loading...</p>
      ) : user ? (
        <UserButton user={user} />
      ) : (
        <div className="flex items-center justify-center gap-2">
          <Button asChild variant="default">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/register">Register</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
