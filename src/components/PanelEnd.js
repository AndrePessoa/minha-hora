import React from 'react';
import Panel from './Panel.js';
import Help from './Help.js';

export default class PanelEnd extends Panel {
    constructor(props) {
      super(props);
      this.state = {
        status: true,
        closed: true,
        email: ""
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.send = this.send.bind(this);
      this.open = this.open.bind(this);
    }

    setFocus(){
        this.refs.open.focus();
    }

    handleInputChange(e){
        this.setState({
            email: e.target.value
        });
    }

    send(e){
        e.preventDefault();
        console.log( this.state );
        
    }

    open(e){
        e.preventDefault();
        this.setState({closed: false});
        this.refs.email.focus();
    }

    render() {
      return (
        <form onSubmit={this.next} className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <p>Calcular o custo da hora, para ser efetivo, deve ser considerado como qualquer empreendimento, e levar em conta, além do lucro esperado, os investimentos internos do processo e os custos dos insumos relacionados.</p>
            <h2>salário .</h2>
            <h2>horas .</h2>
            <h2>custo com equipamentos .</h2>
            <h2>custo com programas .</h2>
            <h2>custo com local .</h2>
            <h2>custo em impostos .</h2> 
            <Help header="">
                <p>As perguntas desse formulário foram feitas com fins didáticos para lembrar detalhes que muitas vezes são esquecidos na hora de quantificar os custos da hora do profissional liberal.</p>
                <p>Os valores utilizados são estimativas, e para um resultado mais preciso, ajuste-os à sua realidade.</p>
            </Help>
            <button ref="open" className={['btn', (this.state.status?"":"btn-disabled"), ( !this.state.closed ? 'hidden' : '' )].join(' ')} disabled={!this.state.status} onClick={this.open}>me manda?</button>
            <div className={ [ this.state.closed ? "hidden" : ""].join(' ') }>
                <h2>Seus dados para o envio</h2> 
                <p>Os dados ao lado serão enviados para o seu e-mail, além de um arquivo XLS(planilha).</p>          
                <input 
                    ref="email"
                    name="email"
                    type="email"
                    placeholder="Seu email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    />
                <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.send}>pode mandar!</button>
            </div>            
        </form>
      );
    }
}