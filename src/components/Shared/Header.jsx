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
                <li><Link to='/cart'><i className="fal fa-shopping-cart"></i></Link></li>
            </ul>
        </nav>
    </header>

    
  )
}
