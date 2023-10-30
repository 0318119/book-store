import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/header.css'
import { FiUsers } from 'react-icons/fi';
import logo from '../../assets/images/logo.webp'


function Header() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light headerPos">
                <a class="navbar-brand" href="#">
                    <img src={logo} width="110" height="40" class="d-inline-block align-top" alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse jus" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ownBarBox">
                        <li className="nav-item">
                            <FiUsers />
                            <Link className="nav-link" to="#">Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
