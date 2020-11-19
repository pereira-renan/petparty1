import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className={`small-box bg-${props.color}`} onMouseEnter={props.onMouseEnter}>
            <div className='inner'>
                {props.children}
                <h3>{props.value}</h3>
                <p><b>Tipo: </b>{props.tipo}</p>
                <p><b>Raça: </b>{props.raca}</p>
                <p><b>Porte: </b>{props.porte}</p>
                <p><b>Idade: </b>{props.idade} {props.idade > 1 ? "anos" : "ano"}</p>
            </div>
            <div className='icon'>
                <i className={props.icon}></i>
            </div>
        </div>
    </Grid>
)