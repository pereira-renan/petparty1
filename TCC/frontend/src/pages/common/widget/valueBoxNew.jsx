import React from 'react'
import Grid from '../layout/grid'
import Input from '../../../components/Input/index';

export default props => (
    <Grid cols={props.cols}>
        <div className={`small-box bg-${props.color}`}>
            <div className='inner'>
                <form>
                    <div className="col-xs-2">
                        <label>Nome:</label>
                        <label>Tipo:</label>
                        <label>Raça:</label>
                        <label>Porte:</label>
                        <label>Idade:</label>
                    </div>
                    <div className="col-xs-10">
                        <Input.text value="" type="text" />
                        <div className="formGroup">
                            <select className="form-control">
                                <option>Selecione o tipo</option>
                                <option value="volvo">Cachorro</option>
                                <option value="saab">Gato</option>
                                <option value="fiat">Peixe</option>
                            </select>
                        </div>
                        <Input.text value="" type="text" />
                        <div className="formGroup">
                            <select className="form-control">
                                <option>Selecione o porte</option>
                                <option value="volvo">Grande</option>
                                <option value="saab">Médio</option>
                                <option value="fiat">Pequeno</option>
                            </select>
                        </div>
                        <Input.text value="" type="text" />
                    </div>
                </form>
            </div>
            <div className='icon'>
                <i className={`fa fa-`}></i>
            </div>
        </div>
        <input id="btnAdicionar" name="btnAdicionar" type="submit" value="Adicionar"></input>
    </Grid>
)