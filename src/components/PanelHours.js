import React from 'react';
import Panel from './Panel.js';
import Help from './Help.js';

export default class PanelHours extends Panel {
    constructor(props) {
      super(props);
      this.state = {
        status: false,
        hours: 0,
        days: 0
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.next = this.next.bind(this);
    }

    setFocus(){
        setTimeout(()=>{ this.refs.days.focus(); } , 100 );
    }

    render() {
      return (
        <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <p>Quer trabalhar quantos dias por semana?</p>
            <input
                ref="days"
                type="number"
                min="1"
                max="7"
                name="days"
                required
                onChange={this.handleInputChange}
                />
            <Help header="">
                <p>Quais dias você pretende se dedicar ao trabalho diretamente e indiretamente.</p>
            </Help>
            <p>E quantas horas por dia?</p>
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
            <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.next}>pronto!</button>
        </form>
      );
    }
}