import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StoreList() {
  const [stores,setStores] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    async function load() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/stores', { headers: { Authorization: 'Bearer '+token } });
      setStores(res.data);
    }
    load();
  },[]);

  return (
    <div>
      <h2>Stores</h2>
      <ul>
        {stores.map(s=> (
          <li key={s.id}>
            <b>{s.name}</b> - {s.address} - Avg: {s.avgRating || 'N/A'}
            <button onClick={()=>nav('/stores/'+s.id)}>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}