import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from './Panel.js';
import Help from './Help.js';
import CurrencyInput from 'react-currency-input';

class PanelFormComplete extends Panel {
    constructor(props) {
      super(props);
      this.state = this.props.data;

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputCurrencyChange = this.handleInputCurrencyChange.bind(this);
      this.next = this.next.bind(this);
    }

    setFocus(){
        setTimeout(()=>{ this.refs.days.focus(); } , 100 );
    }

    render() {
        var status = true;

      return (
        <form onSubmit={this.next} className={['panel', (status?"panel-complete":""),this.props.className].join(' ')}>
            <CurrencyInput 
                name="salary"
                ref="salary" 
                value={this.props.inputs.salary}
                decimalSeparator=","
                thousandSeparator="."
                onChangeEvent={this.props.changeSalary}
                prefix="R$ "
                />
            <Help header="">
                <p>Quantas horas por dia você pretende disponibilizar, tanto na tarefa em si, como em tarefas relacionadas.</p>
            </Help>
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
  
  export function changeSalary(value) {
    return {
      type: 'UPDATE_SALARY',
      value
    }
  }
  
  const mapDispatchToProps = dispatch =>({
    changeSalary( event, maskedvalue, floatvalue ){
      return dispatch(changeSalary( floatvalue ));
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelFormComplete)