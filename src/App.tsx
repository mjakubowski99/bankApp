import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import RequiredAuth from "./Components/Auth/RequiredAuth";
import UserProfile from './Components/Profile/UserProfile';
import CreateTransaction from './Components/Transaction/CreateTransaction';
import RedirectAuth from './Components/Auth/RedirectAuth';

function App() {
  return (
      <main>
        <Routes>
          <Route path='/login' element={ <RedirectAuth><Login/></RedirectAuth> }/>
          <Route path='/register' element={ <RedirectAuth><Register/></RedirectAuth> }/>
          <Route path='/dashboard' element={ 
              <RequiredAuth><Dashboard/></RequiredAuth>
          }/>
          <Route path='/user/profile' element={ <RequiredAuth><UserProfile/></RequiredAuth>}/>
          <Route path='/transactions/create' element={ <RequiredAuth><CreateTransaction/></RequiredAuth> }/>
        </Routes>
      </main>
  );
}

export default App;
