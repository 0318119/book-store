import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import '../assets/css/main.css'
import Home from '../Screens/Home';


function index() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}

export default index
