import { useState } from 'react';
import { Users, FileText, Shield, Clock, AlertTriangle, Settings, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';
import StatsCard from '../components/StatsCard';
import { sampleUsers, auditLogs } from '../data/sampleData';
import './AdminPanel.css';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');

  const tabs = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'logs', label: 'Audit Logs', icon: Clock },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const sevColors = { info: 'info', warning: 'medium' };

  return (
    <AnimatedPage>
      <div className="admin-page">
        <div className="page-header">
          <h1>Admin Panel</h1>
          <p>System administration, user management, and security settings</p>
        </div>

        <div className="admin-stats">
          <StatsCard icon={Users} label="Total Users" value={5} delay={0} />
          <StatsCard icon={FileText} label="Total Documents" value={38} delay={1} />
          <StatsCard icon={Activity} label="API Calls Today" value={247} delay={2} />
          <StatsCard icon={AlertTriangle} label="Security Alerts" value={1} delay={3} color="warning" />
        </div>

        <div className="admin-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`admin-tab ${activeTab === t.id ? 'admin-tab-active' : ''}`}
              onClick={() => setActiveTab(t.id)}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="admin-table-wrapper">
                <table className="docs-table">
                  <thead>
                    <tr><th>User</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Last Active</th></tr>
                  </thead>
                  <tbody>
                    {sampleUsers.map(u => (
                      <tr key={u.id}>
                        <td className="doc-name-cell">
                          <div className="navbar-avatar" style={{ width: 28, height: 28, fontSize: '0.6rem' }}>{u.avatar}</div>
                          {u.name}
                        </td>
                        <td>{u.email}</td>
                        <td><span className={`badge badge-${u.role === 'Admin' ? 'high' : u.role === 'Compliance Officer' ? 'medium' : 'info'}`}>{u.role}</span></td>
                        <td>{u.department}</td>
                        <td><span className={`badge badge-${u.status === 'Active' ? 'low' : 'medium'}`}>{u.status}</span></td>
                        <td className="doc-date">{u.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'logs' && (
            <motion.div className="audit-logs" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {auditLogs.map((log, i) => (
                <div key={log.id} className="audit-item" style={{ animationDelay: `${i * 0.04}s` }}>
                  <div className="audit-time">{log.timestamp}</div>
                  <div className="audit-info">
                    <span className={`badge badge-${sevColors[log.severity]}`}>{log.action}</span>
                    <strong>{log.user}</strong>
                    <p>{log.details}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div className="security-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="security-grid">
                {[
                  { label: 'Two-Factor Authentication', desc: 'Require 2FA for all users', enabled: true },
                  { label: 'Session Timeout', desc: 'Auto-logout after 30 minutes', enabled: true },
                  { label: 'IP Whitelisting', desc: 'Restrict access to approved IPs', enabled: false },
                  { label: 'Audit Logging', desc: 'Track all user actions', enabled: true },
                  { label: 'Data Encryption', desc: 'Encrypt data at rest and in transit', enabled: true },
                  { label: 'Password Rotation', desc: 'Force password change every 90 days', enabled: false },
                ].map((s, i) => (
                  <div key={i} className="security-item glass-card">
                    <div className="security-item-info">
                      <h4>{s.label}</h4>
                      <p>{s.desc}</p>
                    </div>
                    <label className="toggle-switch">
                      <input type="checkbox" defaultChecked={s.enabled} />
                      <span className="toggle-slider" />
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AnimatedPage>
  );
}
