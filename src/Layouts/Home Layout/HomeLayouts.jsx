import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Banner from '../../Pages/Banner/Banner';
import WhyLearningMatters from '../../Component/why learning/WhyLearningMatters';
import Footer from '../../Component/Footer/Footer';

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
                <div className='my-5'>
                    <WhyLearningMatters></WhyLearningMatters>
                </div>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayouts;