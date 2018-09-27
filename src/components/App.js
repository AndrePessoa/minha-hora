import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import '../App.scss';
import Nav from './Nav.js';
import PanelSalary from './PanelSalary.js';
import PanelHours from './PanelHours.js';
import PanelResult from './PanelResult.js';
import PanelResources from './PanelResources.js';
import PanelEnd from './PanelEnd.js';
import PanelFormComplete from './PanelFormComplete.js';
import Logo from './Logo.svg.js';
import Illustrations from './Illustrations.svg.js';
import DataController from '../controllers/dataController.js';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
				currentStep:0,
				steps: [
					{id:'salary'},
					{id:'hours'},
					{id:'resources'},
					{id:'result'},
					{id:'complete'}],
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
		//if( e.target.attributes['disabled'] ) return false;
		this.setState({ currentStep: parseInt( e.target.attributes['data-index'].value, 10 ) });
	}

	nextPanel(){
		if( this.state.data.checkData(this.state.currentStep) ){
			this.setState({currentStep: this.state.currentStep + 1 }, ()=>{
				this.refs[ "panel-" + this.state.currentStep ].setFocus();
			});	
		}	
	}

	render() {

		return (
			<div className="app">			
				<Router>
					<main>
						<div id="top">
							<h1 id="logo">
								<Logo/>
							</h1>
							<Nav steps={this.state.steps} panels={this.props.panels } />     
						</div>		
							<div id="panels">
								<Route exact path="/" component={PanelSalary} />
								<Route path="/salary" component={PanelSalary} />
								<Route path="/hours" component={PanelHours} />
								<Route path="/resources" component={PanelResources} />
								<Route path="/result" component={PanelResult} />
								<Route path="/end" component={PanelEnd} />
								<Route path="/complete" component={PanelFormComplete} />
							</div>
					</main>    
				</Router>
			</div>
		);
	}
}

function mapStateToProps(state) {
    return { 
      inputs: state.inputs,
      panels: state.panels
    }
}

export default connect(mapStateToProps)(App);
