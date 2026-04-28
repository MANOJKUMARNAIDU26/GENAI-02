import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Scale, Eye, EyeOff, Mail, Lock, User, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import './LoginPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const pwdRules = [
    { label: 'Min 8 characters', test: (p) => p.length >= 8 },
    { label: '1 uppercase', test: (p) => /[A-Z]/.test(p) },
    { label: '1 lowercase', test: (p) => /[a-z]/.test(p) },
    { label: '1 number', test: (p) => /[0-9]/.test(p) },
    { label: '1 special char', test: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
  ];

  const getStrength = () => {
    const passed = pwdRules.filter(r => r.test(form.password)).length;
    if (passed <= 1) return { level: 0, label: '', color: '' };
    if (passed <= 2) return { level: 1, label: 'Weak', color: 'weak' };
    if (passed <= 3) return { level: 2, label: 'Fair', color: 'fair' };
    if (passed <= 4) return { level: 3, label: 'Good', color: 'good' };
    return { level: 4, label: 'Strong', color: 'strong' };
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (pwdRules.filter(r => r.test(form.password)).length < 5) errs.password = 'Password doesn\'t meet all requirements';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('lexiclause-auth', JSON.stringify({ email: form.email, name: form.name }));
      toast.success('Account created successfully!');
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const strength = getStrength();
  const update = (field, value) => { setForm({...form, [field]: value}); setErrors({...errors, [field]: ''}); };

  return (
    <div className="auth-page">
      <div className="auth-bg-effects">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
      </div>

      <motion.div className="auth-container"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      >
        <div className="auth-brand">
          <Scale size={36} className="auth-brand-icon" />
          <h1>LexiClause AI</h1>
          <p>Legal Drafting Intelligence System</p>
        </div>

        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join the legal intelligence platform</p>

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className={`form-group ${errors.name ? 'form-group-error' : ''}`}>
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={16} className="input-icon" />
                <input type="text" placeholder="Your full name" value={form.name}
                  onChange={e => update('name', e.target.value)} disabled={loading} />
              </div>
              {errors.name && <span className="form-error"><AlertCircle size={12} /> {errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'form-group-error' : ''}`}>
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input type="email" placeholder="you@example.com" value={form.email}
                  onChange={e => update('email', e.target.value)} disabled={loading} />
              </div>
              {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password ? 'form-group-error' : ''}`}>
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input type={showPwd ? 'text' : 'password'} placeholder="Create a strong password" value={form.password}
                  onChange={e => update('password', e.target.value)} disabled={loading} />
                <button type="button" className="input-toggle" onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <>
                  <div className="password-strength">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`strength-bar ${strength.level >= i ? `active-${strength.color}` : ''}`} />
                    ))}
                  </div>
                  {strength.label && <span className="strength-text" style={{color: `var(--${strength.color === 'weak' ? 'danger' : strength.color === 'fair' ? 'warning' : strength.color === 'good' ? 'info' : 'success'})`}}>{strength.label}</span>}
                  <div className="password-rules">
                    {pwdRules.map((rule, i) => (
                      <span key={i} className={`password-rule ${rule.test(form.password) ? 'met' : ''}`}>
                        {rule.test(form.password) ? <Check size={10} /> : <AlertCircle size={10} />}
                        {rule.label}
                      </span>
                    ))}
                  </div>
                </>
              )}
              {errors.password && <span className="form-error"><AlertCircle size={12} /> {errors.password}</span>}
            </div>

            <div className={`form-group ${errors.confirmPassword ? 'form-group-error' : ''}`}>
              <label>Confirm Password</label>
              <div className="input-wrapper">
                <Lock size={16} className="input-icon" />
                <input type="password" placeholder="Re-enter password" value={form.confirmPassword}
                  onChange={e => update('confirmPassword', e.target.value)} disabled={loading} />
              </div>
              {errors.confirmPassword && <span className="form-error"><AlertCircle size={12} /> {errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Creating Account...</> : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
