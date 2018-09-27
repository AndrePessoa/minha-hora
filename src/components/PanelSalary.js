import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import CurrencyInput from 'react-currency-input';
import Panel from './Panel.js';
import Help from './Help.js';


class PanelSalary extends Panel {
    constructor(props) {
      super(props);
    }

    componentDidMount(){
      this.refs.salary.theInput.focus();
    }

    render() {
      const salary = this.props.inputs.salary;
      const status = this.props.panels['salary'];

      return (
        <form onSubmit={this.next} className={['panel', (status?"panel-complete":""),this.props.className].join(' ')}>
          <h2>Quanto você quer ganhar por mês?</h2>         
          <CurrencyInput 
            name="salary"
            ref="salary" 
            value={salary}
            decimalSeparator=","
            thousandSeparator="."
            onChangeEvent={this.props.changeSalary}
            prefix="R$ "
            />
            <Help header="">
                <p>Quanto você quer ganhar mensalmente como salário líquido, já descontados todos os custos e impostos.</p>
                <p>Imagine que você é um funcionário de si mesmo.</p>
            </Help>
          <Link className={['btn', (status?"":"btn-disabled")].join(' ')} disabled={!status} to={status?"/hours":""}>pronto!</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(PanelSalary)