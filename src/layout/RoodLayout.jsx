import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../Footer/Footer';

const RoodLayout = () => {
    return (
        <div>
            <Navbar></Navbar>

            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RoodLayout;