import { logout } from '@/actions/auth/auth';
import { ExitIcon } from '@radix-ui/react-icons';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type Props = {
  user: User;
};

function UserButton({ user }: Props) {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>
            {user?.displayName?.slice(0, 2).toUpperCase() || 'UR'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 " align="end">
        <DropdownMenuItem>{user?.email}</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="cursor-pointer"
        >
          <ExitIcon className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserButton;
