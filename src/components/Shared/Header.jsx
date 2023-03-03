import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CartPage } from '../../pages/CartPage'
import './styles/header.css'

export const Header = () => {
  return (
    <header className='navbar__container'>
        <h1><Link to='/' className='navbar__title'>e-commerce</Link></h1>
        <nav className='navbar__nav'>
            <ul className='navbar__list'>
                <li><Link to='/user/login'><i className="fal fa-user"></i></Link></li>
                <li><Link to='/purchases'><i className="fal fa-archive"></i></Link></li>
                {
                  localStorage.getItem('token') ? 
                    <>
                      <li data-bs-toggle="offcanvas" data-bs-target="#cartModal" aria-controls="cartModal">
                        <i className="fal fa-shopping-cart"></i>
                      </li>
                      <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="cartModal" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header">
                          <h5 className="offcanvas-title" id="offcanvasRightLabel">
                            <div className='gotoCartLink-container'>
                              <Link to='/cart' className='gotoCartLink'>Go to cart</Link>
                            </div>
                          </h5>
                          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body overflow-auto">
                          <CartPage />
                        </div>
                      </div>
                    </>
                    : 
                    <li><Link to='/user/login'><i className="fal fa-shopping-cart"></i></Link></li>
                }
            </ul>
        </nav>
    </header>

    
  )
}
