import React from 'react';
import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import RequiredAuth from "./Components/Auth/RequiredAuth";
import UserProfile from './Components/Profile/UserProfile';
import CreateTransaction from './Components/Transaction/CreateTransaction';
import RedirectAuth from './Components/Auth/RedirectAuth';
import CreateContant from "./Components/Contact/CreateContant";
import TransactionDetails from './Components/Transaction/TransactionDetails';

function App() {
  return (
      <main>
        <Routes>
          <Route path='/' element={ <Navigate replace to="/dashboard"/> }/>
          <Route path='/login' element={ <RedirectAuth><Login/></RedirectAuth> }/>
          <Route path='/register' element={ <RedirectAuth><Register/></RedirectAuth> }/>
          <Route path='/dashboard' element={ 
              <RequiredAuth><Dashboard/></RequiredAuth>
          }/>
          <Route path='/user/profile' element={ <RequiredAuth><UserProfile/></RequiredAuth>}/>

          <Route path='/transactions/create' element={ <RequiredAuth><CreateTransaction/></RequiredAuth> }/>
          <Route path='/transaction/details' element={ <RequiredAuth><TransactionDetails/></RequiredAuth> }/>
            <Route path='/contacts/create' element={ <RequiredAuth><CreateContant/></RequiredAuth> }/>
        </Routes>
      </main>
  );
}

export default App;
