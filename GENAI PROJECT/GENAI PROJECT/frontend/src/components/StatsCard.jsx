import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './StatsCard.css';

export default function StatsCard({ icon: Icon, label, value, trend, color = 'accent', delay = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const num = typeof value === 'number' ? value : parseInt(value) || 0;
    if (num === 0) { setCount(0); return; }
    const duration = 1200;
    const steps = 40;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      className={`stats-card stats-card-${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.4 }}
    >
      <div className="stats-card-icon">
        <Icon size={22} />
      </div>
      <div className="stats-card-info">
        <span className="stats-card-value">{count.toLocaleString()}</span>
        <span className="stats-card-label">{label}</span>
      </div>
      {trend && (
        <span className={`stats-card-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </motion.div>
  );
}
