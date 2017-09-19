import React from 'react';
import Panel from './Panel.js';
import Help from  './Help.js';

export default class PanelResult extends Panel{
    constructor(props){
        super(props);
        this.state = {
            status: true
        }
        this.next = this.next.bind(this);
    }
    render(){
        let result = this.props.data.getResult();
        return (
            <div className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
              <p>O custo da sua hora deve ser de</p>         
              <input 
                name="result"
                type="text"
                value={result}
                readOnly={true}
                />
                <Help header="">
                    <p>Quanto você quer ganhar mensalmente como salário líquido, já descontados todos os custos e impostos.</p>
                    <p>Imagine que você é um funcionário de si mesmo.</p>
                </Help>
              <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.next}>como assim?</button>
            </div>
          );
    }
}