import React from 'react'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu' data-widget="tree">
        <MenuItem path='/dashboard' label='Início' icon='home'/>
        <MenuItem path='/profile' label='Perfil' icon='user'/>
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='/userProfile?addPet'
                label='Registrar um pet' icon='paw'/>
        </MenuTree>
    </ul>
)