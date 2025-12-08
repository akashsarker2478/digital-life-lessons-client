import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';

const DashboardLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className='my-5'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;