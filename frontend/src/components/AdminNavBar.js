import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('clientId');
    window.location.href = '/login';
  };

  const handleLogoClick = () => {
    navigate('/'); // or '/landing' depending on your route
  };

  return (
    <div>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <button
          onClick={handleLogoClick}
          className="text-2xl font-bold text-blue-600 focus:outline-none hover:text-blue-800 transition"
        >
          Eventio
        </button>
        <div className="flex items-center space-x-6">
          <span className="flex items-center text-gray-700">
            <User className="mr-2" />
            <span className="font-medium">Admin</span>
          </span>
          <button
            onClick={handleLogout}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LogOut className="mr-2 -ml-1 h-5 w-5" aria-hidden="true" />
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default AdminNavBar;
