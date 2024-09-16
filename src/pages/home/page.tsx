import { useAuthContext } from '@/context/AuthContext';

function Home() {
  const { user } = useAuthContext();
  return (
    <div className="font-mono font-bold text-2xl tracking-widest italic p-3">
      {user?.displayName}
    </div>
  );
}

export default Home;
