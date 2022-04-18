import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import RequiredAuth from "./Components/Auth/RequiredAuth";
import UserProfile from './Components/Profile/UserProfile';

function App() {
  return (
      <main>
        <Routes>
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/dashboard' element={ 
              <Dashboard/>
          }/>
          <Route path='/user/profile' element={ <UserProfile/>}/>
        </Routes>
      </main>
  );
}

export default App;
