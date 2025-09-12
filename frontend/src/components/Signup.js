import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const nav = useNavigate();

  function validate() {
    if (name.length < 20 || name.length > 60) { alert('Name 20-60 chars'); return false; }
    if (address.length > 400) { alert('Address max 400'); return false; }
    if (password.length < 8 || password.length > 16) { alert('Password 8-16'); return false; }
    if (!/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) { alert('Password needs uppercase and special char'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Invalid email'); return false; }
    return true;
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, address, password });
      alert('Registered - please login');
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <textarea placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} /><br/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} /><br/>
        <button>Signup</button>
      </form>
    </div>
  );
}