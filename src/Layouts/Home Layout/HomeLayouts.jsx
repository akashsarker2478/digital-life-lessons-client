import React from 'react';
import Navbar from '../../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Component/Footer/Footer';

const HomeLayouts = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            
            <main className="flex-1">
                <Outlet />
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayouts;