import React from 'react';
import './App.css';
import Login from './Login/Login';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (
      <main>
        <Routes>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/dashboard' element={ <Dashboard/> }/>
        </Routes>
      </main>
  );
}

export default App;
