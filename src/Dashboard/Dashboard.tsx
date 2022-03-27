import React from 'react';
import Navbar from '../Common/Navbar';
import UserAccountNavbar from '../Common/UserAccountNavbar';

function Dashboard(){
    return (
        <div>
            <Navbar loggedIn={true}></Navbar>
            <UserAccountNavbar/>
        </div>
    )
}

export default Dashboard;