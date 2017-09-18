import React from 'react';
import CurrencyInput from 'react-currency-input';
import Panel from './Panel.js';
import Help from './Help.js';

export default class PanelSalary extends Panel {
    constructor(props) {
      super(props);
      this.state = {
        status: false,
        teste: true,
        salario: "0.00"
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputCurrencyChange = this.handleInputCurrencyChange.bind(this);
      this.next = this.next.bind(this);
    }

    render() {
      return (
        <div className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
          <p>Quanto você quer ganhar por mês?</p>         
          <CurrencyInput 
            ref="salario" 
            value={this.state.salario}
            decimalSeparator=","
            thousandSeparator="."
            onChangeEvent={this.handleInputCurrencyChange}
            prefix="R$ "
            />
            <Help header="">
                <p>Quanto você quer ganhar mensalmente como salário líquido, já descontados todos os custos e impostos.</p>
                <p>Imagine que você é um funcionário de si mesmo.</p>
            </Help>
          <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.next}>Pronto</button>
        </div>
      );
    }
}