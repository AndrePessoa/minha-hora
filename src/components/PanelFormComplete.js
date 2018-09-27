import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Panel from './Panel.js';
import { changeSalary } from './PanelSalary.js';
import { changeDays, changeHours } from './PanelHours.js';
import { changeArea, changePlace } from './PanelResources.js';

import Help from './Help.js';
import CurrencyInput from 'react-currency-input';
import NumberFormat from 'react-number-format';
import Checkbox from 'rc-checkbox';
import { Doughnut as PieChart } from 'react-chartjs';

class PanelFormComplete extends Panel {
    constructor(props) {
      super(props);
      this.state = this.props.data;

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputCurrencyChange = this.handleInputCurrencyChange.bind(this);
      this.next = this.next.bind(this);

      //Chart.defaults.global.responsive = true;
    }

    setFocus(){
        setTimeout(()=>{ this.refs.days.focus(); } , 100 );
    }

    renderChart(){
        const percents = this.props.inputs.percents;
        const chartData = [
            {strokeWidth: 0, value: percents.personal, label: "Pessoal"},
            {strokeWidth: 0, value: percents.admin, label: "Administração"},
            {strokeWidth: 0, value: percents.place,  label: "Insumos"},
            {strokeWidth: 0, value: percents.assets,  label: "Infra-estrutura"},
            {strokeWidth: 0, value: percents.tax,  label: "Impostos"}
        ];
        const chartOptions = {
            segmentStrokeWidth: 0,
            segmentStrokeColor: '#3e3e3e'
        };
        return <PieChart data={chartData} options={chartOptions}/>
    }

    render() {
        var status = true;

      return (
        <form onSubmit={this.next} className={['panel', 'panel-large', (status?"panel-complete":""),this.props.className].join(' ')}>
            { this.renderChart() }
            <h3>Valor base</h3>
            <div className="input-line">
                <label>Salário</label>
                <CurrencyInput 
                    name="salary"
                    ref="salary" 
                    value={this.props.inputs.salary}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSalary}
                    prefix="R$ "
                    />
            </div>
            <h3>Benefícios</h3>
            <div className="input-line">
                <label>Folga nos feriados</label>
                <Checkbox
                    name='holidays'
                    onChange={this.props.changeCheckbox}
                    defaultChecked={this.props.inputs.holidays}
                />
            </div>
            <div className="input-line">
                <label>13o salário</label>
                <Checkbox
                    name='annual_bonus'
                    onChange={this.props.changeCheckbox}
                    defaultChecked={this.props.inputs.annual_bonus}
                />
            </div>
            <div className="input-line">
                <label>Dias úteis de férias</label>
                <input
                    type="number"
                    min="0"
                    max="90"
                    name="vacation"
                    defaultValue={this.props.inputs.vacation}
                    required
                    onChange={this.props.changeSub}
                    />
            </div>
            <div className="input-line">
                <label>Plano de saúde</label>
                <CurrencyInput 
                    name="health_plan"
                    value={this.props.inputs.health_plan}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>Previdência</label>
                <CurrencyInput 
                    name="pension"
                    value={this.props.inputs.pension}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <h3>Horas produtivas (produção)</h3>
            <div className="input-line">
                <label>Dias por semana</label>
                <input 
                    ref="days"
                    type="number"
                    min="1"
                    max="7"
                    name="days"
                    defaultValue={this.props.inputs.hours}
                    required
                    onChange={this.props.changeDays}
                    />
            </div>
            <div className="input-line">
                <label>Horas por dia</label>
                <input
                    type="number"
                    min="1"
                    max="24"
                    name="hours"
                    defaultValue={this.props.inputs.days}
                    required
                    onChange={this.props.changeHours}
                    />
            </div>
            <div className="input-line">
                <label>Administração (%)</label>
                <NumberFormat
                    name="admin_time"
                    value={this.props.inputs.admin_time * 100}
                    suffix=" %"
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={this.props.changePerc}
                    />
            </div>
            <div className="input-line">
                <label>Projetos internos (%)</label>
                <NumberFormat
                    name="selfprojects_time"
                    value={this.props.inputs.selfprojects_time * 100}
                    suffix=" %"
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={this.props.changePerc}
                    />
            </div>
            <div className="input-line">
                <label>Prospecção (%)</label>
                <NumberFormat
                    name="prospect_time"
                    value={this.props.inputs.prospect_time * 100}
                    suffix=" %"
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={this.props.changePerc}
                    />
            </div>
            <div className="input-line">
                <label>Margem de risco (%)</label>
                <NumberFormat
                    name="securitymargin_time"
                    value={this.props.inputs.securitymargin_time * 100}
                    suffix=" %"
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={this.props.changePerc}
                    />
            </div>
            <h3>Equipamento (capital investido)</h3>
            <div className="input-line">
                <label>custo de hardware</label>
                <CurrencyInput 
                    name="hardware_buy_cost"
                    value={this.props.inputs.hardware_buy_cost}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>Ciclo de vida (meses)</label>
                <input
                    type="number"
                    min="0"
                    max="96"
                    name="hardware_life_circle"
                    defaultValue={this.props.inputs.hardware_life_circle}
                    required
                    onChange={this.props.changeSub}
                    />
            </div>
            <div className="input-line">
                <label>Preço de revenda</label>
                <CurrencyInput 
                    name="hardware_sell_cost"
                    value={this.props.inputs.hardware_sell_cost}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>

            <div className="input-line">
                <label>custo de software (compras)</label>
                <CurrencyInput 
                    name="software_buy_cost"
                    value={this.props.inputs.software_buy_cost}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>custo de software (assinaturas)</label>
                <CurrencyInput 
                    name="software_rent_cost"
                    value={this.props.inputs.software_rent_cost}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div> 
            <h3>Local (custo fíxo)</h3>
            <div className="input-line">
                <label>aluguel do imóvel</label>
                <CurrencyInput 
                    name="place_rent"
                    value={this.props.inputs.place_rent}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>custo de internet + celular</label>
                <CurrencyInput 
                    name="place_internet"
                    value={this.props.inputs.place_internet}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>contas gerais do imóvel</label>
                <CurrencyInput 
                    name="place_bills"
                    value={this.props.inputs.place_bills}
                    decimalSeparator=","
                    thousandSeparator="."
                    onChangeEvent={this.props.changeSubCurrency}
                    prefix="R$ "
                    />
            </div>
            <div className="input-line">
                <label>% da área dedicada do imóvel</label>
                <NumberFormat
                    name="place_percent"
                    value={this.props.inputs.place_percent * 100}
                    suffix=" %"
                    decimalScale={0}
                    allowNegative={false}
                    onValueChange={this.props.changePerc}
                    />
            </div>
        
            <div className="input-line">
                <label>Valor por hora</label>
                <CurrencyInput 
                  name="salary"
                  ref="salary" 
                  value={this.props.inputs.perHour}
                  decimalSeparator=","
                  thousandSeparator="."
                  onChangeEvent={this.props.changeSalary}
                  prefix="R$ "
                  readOnly={true}
                  />
            </div>
            <div className="action-line">
                <Link className={['btn', (status?"":"btn-disabled")].join(' ')} disabled={!status} to={status?"/end":""}>pronto!</Link>
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

export function changeSub(value, name) {
    return {
      type: 'UPDATE_SUB',
      value,
      name
    }
}

export function changeSubArea(value, name) {
    return {
      type: 'UPDATE_AREA_SUB',
      value,
      name
    }
}

export function changeSubPlace(value, name) {
    return {
      type: 'UPDATE_PLACE_SUB',
      value,
      name
    }
}

export function changeSubValue(value, name){
    return {
        type: 'UPDATE_SUB',
        value,
        name
      }
}


const mapDispatchToProps = dispatch =>({
    changeSalary( event, maskedvalue, floatvalue ){
        return dispatch(changeSalary( floatvalue ));
    },
    changeDays( event ){
        return dispatch(changeDays( event.target.value ));
    },
    changeHours( event ){
        return dispatch(changeHours( event.target.value ));
    },
    changeArea( seleted ){
      return dispatch(changeArea( seleted.value ));
    },
    changePlace( seleted ){
      return dispatch(changePlace( seleted.value ));
    },
    changeSub( event ){
      return dispatch(changeSub( event.target.value, event.target.name ));
    },
    changeSubArea( event ){
      return dispatch(changeSubArea( event.target.value, event.target.name ));
    },
    changeSubPlace( event ){
      return dispatch(changeSubPlace( event.target.value, event.target.name ));
    },
    changeCheckbox( event ){
        return dispatch(changeSubValue( event.target.checked, event.target.name )); 
    },
    changeSubCurrency( event, maskedvalue, floatvalue ){
        return dispatch(changeSubValue( floatvalue, event.target.name ));
    },
    changePerc(values, event){
        return dispatch(changeSubValue( values.floatValue / 100, event.target.name ));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PanelFormComplete)