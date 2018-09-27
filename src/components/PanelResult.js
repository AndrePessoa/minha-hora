import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import CurrencyInput from 'react-currency-input';

import Panel from './Panel.js';
import Help from  './Help.js';

class PanelResult extends Panel{
    constructor(props){
        super(props);
        this.state = {
            status: true
        }
        this.next = this.next.bind(this);
    }

    render(){
        const result = this.props.inputs.perHour;
        const status = this.props.panels.result;
        return (
            <form onSubmit={this.next} className={['panel', (status?"panel-complete":""),this.props.className].join(' ')}>
                <h2>O custo da sua hora deve ser de</h2>   
                <CurrencyInput 
                  name="salary"
                  ref="salary" 
                  value={result}
                  decimalSeparator=","
                  thousandSeparator="."
                  onChangeEvent={this.props.changeSalary}
                  prefix="R$ "
                  readOnly={true}
                  />
                <Help header="">
                    <p>Esse valor é calculado sobre um cenário estimado.</p>
                    <p>A seguir, veremos melhores todos os valores empregados e conceitos.</p>
                </Help>
                <div className="action-line">
                    <Link className={['btn', (status?"":"btn-disabled")].join(' ')} disabled={!status} to={status?"/complete":""}>como assim?</Link>
                </div>
            </form>
          );
    }
}


/* Reduxing */

function mapStateToProps(state) {
    return { 
      inputs: state.inputs,
      panels: state.panels
    }
}
  
  
const mapDispatchToProps = dispatch =>({
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelResult)