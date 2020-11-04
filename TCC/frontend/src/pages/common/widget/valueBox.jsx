import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className={`small-box bg-${props.color}`} onMouseEnter={props.onMouseEnter}>
            <div className='inner'>
                {props.children}
                <h3>{props.value}</h3>
                <p>Tipo: {props.tipo}</p>
                <p>Raça: {props.raca}</p>
                <p>Porte: {props.porte}</p>
                <p>Idade: {props.idade} {props.idade > 1 ? "anos" : "ano"}</p>
            </div>
            <div className='icon'>
                <i className={`fa fa-${props.icon}`}></i>
            </div>
        </div>
    </Grid>
)