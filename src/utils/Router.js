import React from "react";
// composant de routage
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
    );
}