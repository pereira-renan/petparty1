import React from 'react'
import Grid from './grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='row my-10'>{props.children}</div>
    </Grid>
)