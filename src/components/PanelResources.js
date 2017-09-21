import React from 'react';
import Panel from './Panel.js';
import Help from './Help.js';
import Select from 'react-select';
import Rooms from '../models/Rooms.js';
import Areas from '../models/Areas.js';

export default class PanelResources extends Panel {
    constructor(props) {
      super(props);
      this.state = {
        status: false,
        values: [
            { "value": "programacao", "label":"Programação" },
            { "value": "design-grafico", "label":"Design gráfico" }
        ],
        area: null,
        room: null
      };

      this.handleArea = this.handleArea.bind(this);
      this.handleRoom = this.handleRoom.bind(this);
      this.next = this.next.bind(this);
    }

    handleArea(val){
        let areaDefault = { value: null, software: { rent: 0, buy: 0 }, hardware: { buy: 0, sell: 0 } };
        let subData = val || areaDefault;
        let result = {
            area: subData.value,
            software_buy_cost:  subData.software.buy,
            software_rent_cost: subData.software.rent,
            hardware_buy_cost:  subData.software.buy,
            hardware_sell_cost: subData.software.rent
        };

        this.setState({ area: subData.value },()=>{
            this.handleSelectChange( result );
        });
    }

    handleRoom(val){
        let areaDefault = { value: null, rent: 0, bills: 0, internet: 0, percent: 1 };
        let subData = val || areaDefault;
        let result = {
            room: subData.value,
            rent:  subData.rent,
            bills: subData.bills,
            internet:  subData.internet,
            percent: subData.percent
        };

        this.setState({ room: subData.value },()=>{
            this.handleSelectChange( result );
        });
    }

    setFocus(){
        setTimeout(()=>{ this.refs.area.focus(); } , 100 );
    }

    render() {
      return (
        <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <p>qual a sua área de atuação?</p>
            <Select 
                ref="area"
                name="area"
                value={this.state.area}
                options={Areas}
                onChange={this.handleArea}
                />
            <Help header="">
                <p>Qual das opções mais se parece tecnicamente com o ramo de atividade que você exerce.</p>
            </Help>
            <p>de que tipo de ambiente você precisa?</p>
            <Select 
                name="room"
                value={this.state.room}
                options={Rooms} 
                onChange={this.handleRoom}
                />
            <Help header="">
                <p>Qual o espaço necessário para o seu trabalho.</p>
                <p>Esse espaço pode ser compartilhado ou estar inserido dentro de outros contextos.</p>
            </Help>
            <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.next}>pronto!</button>
        </form>
      );
    }
}