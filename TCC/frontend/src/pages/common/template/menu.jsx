import React from 'react'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Início' icon='home'/>
        <MenuItem path='#/userProfile' label='Perfil' icon='user'/>
        <MenuTree label='Cadastro' icon='edit'>
            <MenuItem path='#/userProfile?addPet'
                label='Registrar um pet' icon='paw'/>
        </MenuTree>
        <MenuItem path='#/matches' label='Matches' icon='users'/>
    </ul>
)