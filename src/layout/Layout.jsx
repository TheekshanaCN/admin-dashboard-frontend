import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const hideNavbarOn = ['/login', '/register']; // pages where navbar should be hidden
  const hideNavbar = hideNavbarOn.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {!hideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
