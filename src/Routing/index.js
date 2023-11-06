import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../assets/css/main.css'
import Home from '../Screens/Home';
import AdminPanel from '../Screens/AdminPanel';
import { FlipBook } from '../Components/flipbook/Flipbook';


function index() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AdminPanel" element={<AdminPanel/>} />
                    <Route path="/FlipBook" element={<FlipBook/>} />
                </Routes>
            </Router>
        </>
    )
}

export default index
