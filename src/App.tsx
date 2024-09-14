import { Outlet } from 'react-router-dom';
import Footer from './components/shared/Footer';
import Navbar from './components/shared/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="mt-0 mb-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
