import { useState } from 'react';
import { User, Palette, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import AnimatedPage from '../components/AnimatedPage';
import './Settings.css';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const user = JSON.parse(sessionStorage.getItem('lexiclause-auth') || '{}');
  const [profile, setProfile] = useState({ name: user.name || '', email: user.email || '' });

  const saveProfile = () => {
    sessionStorage.setItem('lexiclause-auth', JSON.stringify(profile));
    toast.success('Profile updated!');
  };

  return (
    <AnimatedPage>
      <div className="settings-page">
        <div className="page-header">
          <h1>Settings</h1>
          <p>Manage your profile and preferences</p>
        </div>

        <div className="settings-sections">
          <motion.div className="settings-section glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h3><User size={18} /> Profile</h3>
            <div className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
              </div>
              <button className="settings-save" onClick={saveProfile}><Save size={14} /> Save Changes</button>
            </div>
          </motion.div>

          <motion.div className="settings-section glass-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h3><Palette size={18} /> Appearance</h3>
            <div className="theme-options">
              <button className={`theme-option ${theme === 'dark' ? 'theme-active' : ''}`} onClick={() => theme !== 'dark' && toggleTheme()}>
                <div className="theme-preview theme-preview-dark" />
                <span>Dark Mode</span>
              </button>
              <button className={`theme-option ${theme === 'light' ? 'theme-active' : ''}`} onClick={() => theme !== 'light' && toggleTheme()}>
                <div className="theme-preview theme-preview-light" />
                <span>Light Mode</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedPage>
  );
}
