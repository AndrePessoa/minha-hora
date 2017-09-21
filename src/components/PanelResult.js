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
            <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
              <p>O custo da sua hora deve ser de</p>         
              <input 
                name="result"
                type="text"
                value={result}
                readOnly={true}
                />
                <Help header="">
                    <p>Esse valor é calculado sobre um cenário estimado.</p>
                    <p>A seguir, veremos melhores todos os valores empregados e conceitos.</p>
                </Help>
              <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.next}>como assim?</button>
            </form>
          );
    }
}