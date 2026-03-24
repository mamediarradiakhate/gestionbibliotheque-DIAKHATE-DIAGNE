import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Book } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Déclencher l'événement personnalisé pour mettre à jour l'état dans App.jsx
    window.dispatchEvent(new Event('auth-change'));
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-400">
          <Book size={24} />
          <span>Library System</span>
        </Link>
        
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-blue-400 transition-colors">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-blue-400 transition-colors">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
