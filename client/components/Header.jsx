import React from 'react'
import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">Met Museum Art Explorer</h1>
      <nav className="header-nav">
        <a href="/" className="nav-link">Home</a>
      </nav>
    </header>
  )
}

export default Header
