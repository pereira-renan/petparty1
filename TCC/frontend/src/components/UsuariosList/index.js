import React from 'react';

const listaCuidadores = [];

useEffect(() => {
    api.get("providers").then(response => {
        console.log(response.data)
        listaCuidadores = JSON.parse(response.data);
        console.log(listaCuidadores)
    })
})

const UsuariosList = (props) => {
    return(
        <ul>
            {listaCuidadores.map(cuidador => <li>cuidador</li>)}
        </ul>
    );
}

export default UsuariosList;