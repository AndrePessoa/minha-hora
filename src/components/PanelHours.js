import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from './Panel.js';
import Help from './Help.js';

class PanelHours extends Panel {
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
        const { hours, days } = this.props.inputs;
        const status = this.props.panels.hours;

        return (
            <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
                <h2>Quer trabalhar quantos dias por semana?</h2>
                <input
                    ref="days"
                    type="number"
                    min="1"
                    max="7"
                    name="days"
                    defaultValue={days}
                    required
                    onChange={this.props.changeDays}
                    />
                <Help header="">
                    <p>Quais dias você pretende se dedicar ao trabalho diretamente e indiretamente.</p>
                </Help>
                <h2>E quantas horas por dia?</h2>
                <input 
                    type="number"
                    min="1"
                    max="24"
                    name="hours"
                    defaultValue={hours}
                    required
                    onChange={this.props.changeHours}
                    />
                <Help header="">
                    <p>Quantas horas por dia você pretende disponibilizar, tanto na tarefa em si, como em tarefas relacionadas.</p>
                </Help>
                <div className="action-line">
                    <Link className={['btn', (status?"":"btn-disabled")].join(' ')} disabled={!status} to={status?"/resources":""}>pronto!</Link>
                </div>
            </form>
      );
    }
}

function mapStateToProps(state) {
    return { 
      inputs: state.inputs,
      panels: state.panels
    }
}
  
export function changeDays(value) {
    return {
        type: 'UPDATE_DAYS',
        value
    }
}  

export function changeHours(value) {
    return {
        type: 'UPDATE_HOURS',
        value
    }
}
  
const mapDispatchToProps = dispatch =>({
    changeDays( event ){
        return dispatch(changeDays( event.target.value ));
    },
    changeHours( event ){
        return dispatch(changeHours( event.target.value ));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelHours)