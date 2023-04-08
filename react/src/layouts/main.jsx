import '../scss/app.scss';
import 'bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import * as BS from 'react-bootstrap';
import TestExpressApi from '../components/TestExpressApi';
import React from 'react';

export default function Layout()
{
    return (
        <>
            <Sidebar />
            <main>
                <BS.Container fluid>
                    <Outlet />
                </BS.Container>
            </main>
            <Footer/>
            <TestExpressApi />
        </>
    );
}