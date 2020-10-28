import React from 'react'

export default props => (
    <header className='main-header'>
        <a href='/profile' className='logo'>
            <span className='logo-mini'><b>Pet</b>P</span>
            <span className='logo-lg'>
                <i className='fa fa-paw'></i>
                <b>Pet</b>Party
            </span>        
        </a>
        <nav className='navbar navbar-static-top'>
            <a href className='sidebar-toggle' data-toggle='offcanvas'></a>
        </nav>
    </header>
)