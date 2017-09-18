import React, { Component } from 'react';
import './App.scss';
import PanelSalary from './components/PanelSalary.js';
import PanelHours from './components/PanelHours.js';
import Logo from './components/Logo.svg.js';
import DataController from './controllers/dataController.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentStep:0,
        steps: [
          {id:0,value:1},
          {id:1,value:0},
          {id:2,value:0},
          {id:3,value:0},
          {id:4,value:0}],
        data: DataController
    };

    this.onChange = this.onChange.bind(this);
    this.next = this.next.bind(this);
  }

  onChange(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // eslint-disable-next-line
        this.state.data[ key ] = obj[key];        
      }
    }
    this.forceUpdate();
  }

  next(){
    this.setState({currentStep: this.state.currentStep + 1 });
    console.log('next');
  }

  render() {
    const teste = this.state.data.teste ? "sim" : "nao";
    const listItems = this.state.steps.map((step) =>
      <li key={step.id.toString()} className={[( step.id === this.state.currentStep ? "active" : "" ), ( this.state.data.checkData(step.id) ? "enabled" : "disabled" ) ].join(" ")} ></li>
    );

    return (
      <div className="app" data-teste={teste}>
        <div id="">
          <h1 id="logo">
            <Logo/>
          </h1>
          <nav>
            <ul>{listItems}</ul>
          </nav>     
        </div>
        <PanelSalary 
          onChange={this.onChange}
          onNext={this.next}
          step={0}
          data={this.state.data}
          ></PanelSalary>
        <PanelHours 
          onChange={this.onChange}
          onNext={this.next}
          step={1}
          data={this.state.data}
          ></PanelHours>          
      </div>
    );
  }
}

export default App;
