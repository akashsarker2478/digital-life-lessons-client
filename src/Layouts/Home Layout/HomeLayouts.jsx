import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';
import GoToTop from '../../Component/Go to Top/GoToTop';

const HomeLayouts = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            
            <main className="flex-1">
                <Outlet />
            </main>
            <section>
                <GoToTop></GoToTop>
            </section>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayouts;