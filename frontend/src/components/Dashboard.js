import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const nav = useNavigate();
  function logout() { localStorage.removeItem('token'); nav('/'); }
  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={()=>nav('/stores')}>View Stores</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}