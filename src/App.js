import React, { Component } from 'react';
import './App.scss';
import PanelSalary from './components/PanelSalary.js';
import PanelHours from './components/PanelHours.js';
import PanelResult from './components/PanelResult.js';
import PanelResources from './components/PanelResources.js';
import PanelEnd from './components/PanelEnd.js';
import Logo from './components/Logo.svg.js';
import DataController from './controllers/dataController.js'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentStep:0,
        steps: [
          {id:0},
          {id:1},
          {id:2},
          {id:3},
          {id:4}],
        data: DataController
    };

    this.onChange = this.onChange.bind(this);
    this.nextPanel = this.nextPanel.bind(this);
    this.goToPanel = this.goToPanel.bind(this);
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

  goToPanel(e){
    if( e.target.attributes['disabled'] ) return false;
    this.setState({ currentStep: parseInt( e.target.attributes['data-index'].value, 10 ) });
  }

  nextPanel(){
    this.setState({currentStep: this.state.currentStep + 1 });
    console.log('next');
  }

  render() {
    const teste = this.state.data.teste ? "sim" : "nao";
    const listItems = this.state.steps.map((step) =>
      <li 
        key={step.id.toString()} 
        data-index={step.id}
        className={[( step.id === this.state.currentStep ? "active" : "" ), ( this.state.data.checkData(step.id) ? "enabled" : "disabled" ) ].join(" ")} 
        onClick={this.goToPanel}
        disabled={!this.state.data.checkData(step.id)}
        ></li>
    );

    return (
      <div className="app" data-teste={teste}>
        <main>
          <div id="top">
            <h1 id="logo">
              <Logo/>
            </h1>
            <nav>
              <ul>{listItems}</ul>
            </nav>     
          </div>
          <div id="panels">
            <div className={['panels-wrap', ("panel-"+this.state.currentStep) ].join(" ")}>
              <PanelSalary 
                className={[ ( this.state.currentStep === 0 )? "current" : ( this.state.currentStep > 0 )? "prev" : "next" ].join(" ")}
                onChange={this.onChange}
                onNext={this.nextPanel}
                step={0}
                data={this.state.data}
                ></PanelSalary>
                <PanelHours 
                  className={[ ( this.state.currentStep === 1 )? "current" : ( this.state.currentStep > 1 )? "prev" : "next" ].join(" ")}
                  onChange={this.onChange}
                  onNext={this.nextPanel}
                  step={1}
                  data={this.state.data}
                  ></PanelHours>
                <PanelResources 
                    className={[ ( this.state.currentStep === 2 )? "current" : ( this.state.currentStep > 2 )? "prev" : "next" ].join(" ")}
                    onChange={this.onChange}
                    onNext={this.nextPanel}
                    step={2}
                    data={this.state.data}
                    ></PanelResources>
                <PanelResult 
                  className={[ ( this.state.currentStep === 3 )? "current" : ( this.state.currentStep > 3 )? "prev" : "next" ].join(" ")}
                  onChange={this.onChange}
                  onNext={this.nextPanel}
                  step={3}
                  data={this.state.data}
                  ></PanelResult>
                <PanelEnd 
                  className={[ ( this.state.currentStep === 4 )? "current" : ( this.state.currentStep > 4 )? "prev" : "next" ].join(" ")}
                  onChange={this.onChange}
                  onNext={this.nextPanel}
                  step={4}
                  data={this.state.data}
                  ></PanelEnd>                  
            </div>
          </div>
        </main> 
        <aside>
        </aside>     
      </div>
    );
  }
}

export default App;
