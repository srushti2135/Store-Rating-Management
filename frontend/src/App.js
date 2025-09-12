import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import StoreList from './components/StoreList';
import StoreDetails from './components/StoreDetails';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to='/' />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/stores' element={<PrivateRoute><StoreList/></PrivateRoute>} />
        <Route path='/stores/:id' element={<PrivateRoute><StoreDetails/></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;