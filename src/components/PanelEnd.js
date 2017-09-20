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

    send(e){
        console.log( this.props.data.toJSON() );
    }

    open(e){
        this.setState({closed: false});
    }

    render() {
      return (
        <div className={['panel', (this.state.status?"panel-complete":""),this.props.className].join(' ')}>
            <p>salário .</p>
            <p>horas .</p>
            <p>custo com equipamentos .</p>
            <p>custo com programas .</p>
            <p>custo com local .</p>
            <p>custo em impostos .</p> 
            <Help header="">
                <p>As perguntas desse formulário foram feitas com fins didáticos para lembrar detalhes que muitas vezes são esquecidos na hora de quantificar os custos da hora do profissional liberal.</p>
                <p>Os valores utilizados são estimativas, e para um resultado mais preciso, ajuste-os à sua realidade.</p>
            </Help>
            <button className={['btn', (this.state.status?"":"btn-disabled"), ( !this.state.closed ? 'hidden' : '' )].join(' ')} disabled={!this.state.status} onClick={this.open}>me manda?</button>
            <div className={ [ this.state.closed ? "hidden" : ""].join(' ') }>
                <p>Seus dados para o envio</p> 
                <p>Os dados ao lado serão enviados para o seu e-mail, além de um arquivo XLS(planilha).</p>          
                <input 
                    name="email"
                    type="email"
                    placeholder="Seu email"
                    value={this.state.email}
                    />
                <button className={['btn', (this.state.status?"":"btn-disabled")].join(' ')} disabled={!this.state.status} onClick={this.send}>pode mandar!</button>
            </div>            
        </div>
      );
    }
}