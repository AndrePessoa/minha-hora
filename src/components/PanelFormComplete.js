import React from 'react';
import Panel from './Panel.js';
import Help from './Help.js';
import CurrencyInput from 'react-currency-input';

export default class PanelFormComplete extends Panel {
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
      return (
        <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <CurrencyInput 
                name="salary"
                ref="salary" 
                value={this.state.salary}
                decimalSeparator=","
                thousandSeparator="."
                onChangeEvent={this.handleInputCurrencyChange}
                prefix="R$ "
                />
            <input
                ref="days"
                type="number"
                min="1"
                max="7"
                name="days"
                required
                onChange={this.handleInputChange}
                />
            <input 
                type="number"
                min="1"
                max="24"
                name="hours"
                required
                onChange={this.handleInputChange}
                />
            <Help header="">
                <p>Quantas horas por dia você pretende disponibilizar, tanto na tarefa em si, como em tarefas relacionadas.</p>
            </Help>
        </form>
      );
    }
}