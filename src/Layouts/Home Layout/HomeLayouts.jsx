import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import WhyLearningMatters from '../../Component/why learning/WhyLearningMatters';
import Footer from '../../Component/Footer/Footer';

const HomeLayouts = () => {
    return (
        <div className='max-w-11/12 mx-auto'>
            <header>
                <Navbar></Navbar>
               
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayouts;