import React from 'react'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu tree' data-widget="tree">
        <MenuItem path='/dashboard' label='Dashboard' icon='home'/>
        <MenuItem path='/profile' label='Perfil' icon='user'/>
        <MenuTree label='Pets' icon='edit'>
            <MenuItem path='/pets'
                label='Listar Pets' icon='paw'/>
            <MenuItem path='/pets'
                label='Novo Pet' icon='plus'/>
        </MenuTree>
    </ul>
)