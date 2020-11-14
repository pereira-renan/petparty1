import React from 'react'
import Menu from './menu'

export default props => (
    <aside className='main-sidebar'>
        <div className="slimScrollDiv">
            <section className='sidebar'>
                <Menu/>
            </section>
        </div>
    </aside>
)