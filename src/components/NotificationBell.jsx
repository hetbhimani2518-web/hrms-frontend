import { useState, useEffect } from 'react';
import api from '../api/axios';

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text-main)',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '6px 10px',
          borderRadius: '50%',
          position: 'relative'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            background: 'var(--danger)',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '45px',
          right: '0px',
          width: '320px',
          maxHeight: '400px',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(14px)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          boxShadow: 'var(--card-shadow)',
          zIndex: 99999,
          padding: '10px'
        }}>
          <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', color: 'var(--text-main)' }}>
            Notifications
          </h4>
          {notifications.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', textAlign: 'center' }}>No recent notifications.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {notifications.map(n => (
                <div 
                  key={n.id} 
                  onClick={() => { if(!n.read) markAsRead(n.id); }}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: n.read ? 'transparent' : 'var(--accent-soft)',
                    border: '1px solid var(--border-color)',
                    cursor: n.read ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                >
                  {!n.read && <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', position: 'absolute', top: '14px', left: '8px'}}></div>}
                  <p style={{ margin: '0', fontSize: '13px', color: 'var(--text-main)', paddingLeft: !n.read ? '14px' : '0' }}>{n.message}</p>
                  <p style={{ margin: '4px 0 0', fontSize: '11px', color: 'var(--text-muted)', paddingLeft: !n.read ? '14px' : '0' }}>{new Date(n.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
