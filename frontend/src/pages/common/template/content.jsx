import React from 'react'
import ContentHeader from './contentHeader';

export default props => (
    <div className="content-wrapper">
        <ContentHeader title={props.title}/>
        <section className='content'>{props.children}</section>
    </div>
)