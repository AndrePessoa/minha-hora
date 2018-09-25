import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from './Panel.js';
import Help from './Help.js';
import Select from 'react-select';

import Rooms from '../models/Rooms.js';
import Areas from '../models/Areas.js';
class PanelResources extends Panel {
    constructor(props) {
      super(props);
    }

    setFocus(){
        setTimeout(()=>{ this.refs.area.focus(); } , 100 );
    }

    render() {
        let { area, room } = this.props.inputs,
            areaObject = Areas[area],
            roomObject = Rooms[room],
            status = this.props.panels.resources;

      return (
        <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <p>qual a sua área de atuação?</p>
            <Select 
                ref="area"
                name="area"
                value={areaObject}
                options={Areas}
                onChange={this.props.changeArea}
                />
            <Help header="">
                <p>Qual das opções mais se parece tecnicamente com o ramo de atividade que você exerce.</p>
            </Help>
            <p>de que tipo de ambiente você precisa?</p>
            <Select 
                name="room"
                value={roomObject}
                options={Rooms} 
                onChange={this.props.changePlace}
                />
            <Help header="">
                <p>Qual o espaço necessário para o seu trabalho.</p>
                <p>Esse espaço pode ser compartilhado ou estar inserido dentro de outros contextos.</p>
            </Help>
            <Link className={['btn', (status?"":"btn-disabled")].join(' ')} disabled={!status} to={status?"/result":""}>pronto!</Link>
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
  
  export function changeArea(value) {
    return {
      type: 'UPDATE_ASSETS',
      value
    }
  }

  export function changePlace(value) {
    return {
      type: 'UPDATE_PLACE',
      value
    }
  }
  
  const mapDispatchToProps = dispatch =>({
    changeArea( seleted ){
      return dispatch(changeArea( seleted.value ));
    },
    changePlace( seleted ){
      return dispatch(changePlace( seleted.value ));
    }
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PanelResources)