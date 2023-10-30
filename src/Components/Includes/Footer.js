import React from 'react'
import '../assets/css/footer.css'
import logo from '../../assets/images/logo.webp'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
      <section className='botFooter'>
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="footerBotLogo">
                <img src={logo} alt="" />
                <p>
                  Explore a world of knowledge and imagination with our books.
                  Our books are your gateway to new adventures.
                </p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="footerLinks">
                <h5>About</h5>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/">About</Link></li>
                  <li><Link to="/">Terms</Link></li>
                  <li><Link to="/">Privacy</Link></li>
                  <li><Link to="/">Cookies</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="footerLinks">
                <h5>Links</h5>
                <ul>
                  <li><Link to="/">Sign in</Link></li>
                  <li><Link to="/">Login</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-12">
              <p className='text-white text-center mt-5 border-top pt-2'>COPYRIGHT © 2023 EXAMPLE . ALL RIGHT RESERVED.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Footer
