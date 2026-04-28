import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Clear any existing session on mount
  useState(() => {
    sessionStorage.removeItem('lexiclause-auth');
  });

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const name = form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      sessionStorage.setItem('lexiclause-auth', JSON.stringify({ email: form.email, name }));
      toast.success('Welcome to LexiClause AI!');
      setLoading(false);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-effects">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
      </div>

      <motion.div className="auth-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="auth-brand">
          <Scale size={36} className="auth-brand-icon" />
          <h1>LexiClause AI</h1>
          <p>Legal Drafting Intelligence System</p>
        </div>

        <div className="auth-card">
          <h2>Sign In</h2>
          <p className="auth-subtitle">Access your legal clause workspace</p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className={`form-group ${errors.email ? 'form-group-error' : ''}`}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input type="email" placeholder="Enter your email" value={form.email}
                  onChange={e => { setForm({...form, email: e.target.value}); setErrors({...errors, email: ''}); }}
                  disabled={loading} />
              </div>
              {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password ? 'form-group-error' : ''}`}>
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Enter your password" value={form.password}
                  onChange={e => { setForm({...form, password: e.target.value}); setErrors({...errors, password: ''}); }}
                  disabled={loading} />
                <button type="button" className="input-toggle" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <span className="form-error"><AlertCircle size={12} /> {errors.password}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>

        {loading && (
          <div className="auth-pipeline">
            <div className="pipeline-bar-container"><div className="pipeline-bar" /></div>
            <span className="pipeline-text">Authenticating...</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
