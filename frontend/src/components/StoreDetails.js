import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function StoreDetails() {
  const { id } = useParams();
  const [store,setStore] = useState(null);
  const [rating,setRating] = useState(5);

  useEffect(()=>{
    async function load() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/stores/'+id, { headers: { Authorization: 'Bearer '+token } });
      setStore(res.data);
    }
    load();
  },[id]);

  async function submitRating() {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/ratings', { storeId: id, rating }, { headers: { Authorization: 'Bearer '+token } });
    alert('Rating submitted');
  }

  if (!store) return <div>Loading...</div>;
  return (
    <div>
      <h2>{store.name}</h2>
      <div>Address: {store.address}</div>
      <div>Average Rating: {store.avgRating || 'N/A'}</div>
      <div>
        <select value={rating} onChange={e=>setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>
        <button onClick={submitRating}>Submit Rating</button>
      </div>
      <h3>All ratings</h3>
      <ul>
        {store.ratings?.map(r=> <li key={r.id}>{r.User?.name}: {r.rating}</li>)}
      </ul>
    </div>
  );
}