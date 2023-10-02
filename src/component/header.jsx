import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
    return (
        <div className="header">
            <div className="width">
                <h1><Link to="/">CRYPTO TRACKER</Link></h1>
                <img className='bitgif' src="https://media.tenor.com/aDozr1-R2n0AAAAi/bitcoin.gif" alt="gif" />
            </div>
        </div>
    )
}

export default Header
