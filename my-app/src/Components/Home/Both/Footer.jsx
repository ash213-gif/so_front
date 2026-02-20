import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      background: '#C0162C',
      color: '#fff',
      textAlign: 'center',
      padding: '1rem 0',
      zIndex: 1000,
      boxShadow: '0 -2px 12px rgba(192,22,44,0.15)'
    }}>
      <span>&copy; 2026 Shravan Singh Society. All rights reserved.</span>
    </footer>
  );
}
