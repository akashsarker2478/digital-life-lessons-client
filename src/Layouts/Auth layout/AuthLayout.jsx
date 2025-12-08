import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';

const AuthLayout = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
            <div>
                <Navbar></Navbar>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
            <div className='mt-5'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default AuthLayout;