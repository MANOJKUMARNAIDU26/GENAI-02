import { Search, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './TopNavbar.css';

export default function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('lexiclause-auth') || '{}');
  const initials = (user.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    sessionStorage.removeItem('lexiclause-auth');
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <span className="navbar-page-title">LexiClause AI — Legal Clause Retrieval System</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-icon-btn" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="navbar-profile-btn">
          <div className="navbar-avatar">{initials}</div>
          <span className="navbar-username">{user.name || 'User'}</span>
        </div>
        <button className="navbar-icon-btn" onClick={handleLogout} title="Logout">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
