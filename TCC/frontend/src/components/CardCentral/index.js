import React from 'react';
import './styles.css';

const CardCentral = (props) => {
    return(
        <section>
            {props.children}
        </section>
    );
}

export default CardCentral;