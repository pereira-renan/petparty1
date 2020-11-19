import React from 'react'

import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu tree' data-widget="tree">
        <MenuItem path='/dashboard' label='Dashboard' icon='home'/>
        <MenuItem path='/profile' label='Perfil' icon='user'/>
        <MenuItem path='/pets' label='Pets' icon='paw'/>
    </ul>
)