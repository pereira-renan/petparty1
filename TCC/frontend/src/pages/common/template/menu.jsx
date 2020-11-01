import React from 'react'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu tree' data-widget="tree">
        <MenuItem path='/dashboard' label='Início' icon='home'/>
        <MenuItem path='/profile' label='Perfil' icon='user'/>
        <MenuTree label='Pets' icon='edit'>
            <MenuItem path='/#'
                label='Listas Pets' icon='paw'/>
            <MenuItem path='/#'
                label='Novo Pet' icon='plus'/>
        </MenuTree>
    </ul>
)