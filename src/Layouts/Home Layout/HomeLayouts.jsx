import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Banner from '../../Pages/Banner/Banner';

const HomeLayouts = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
            <header>
                <Navbar></Navbar>
                <div className='my-5 rounded-xl'>
                    <Banner></Banner>
                </div>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default HomeLayouts;