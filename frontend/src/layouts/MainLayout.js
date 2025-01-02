import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MainLayout() {
    return (
        <>
            <Header />
            {/* W tym miejscu będzie renderowana konkretna podstrona */}
            <Outlet />
            <Footer />
        </>
    );
}

export default MainLayout;
