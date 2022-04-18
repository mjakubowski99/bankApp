import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar/Sidebar';

export default function AppNavigation(){
    const [sidebarActive, setSidebarActive] = React.useState(false);

    const toggleSidebarActive = () => {
        setSidebarActive(!sidebarActive);
    }

    return (
        <div>
            <Navbar toggleSidebarActive={toggleSidebarActive}></Navbar>
            <Sidebar toggleSidebarActive={toggleSidebarActive} active={sidebarActive}></Sidebar>
        </div>
    );
}