import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Admin from './admin';
function Global() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App/>} />
                <Route path="/admin" element={<Admin/>} />
            </Routes>
        </Router>
    );
}

export default Global;
