import React, { Component } from 'react';

export default class Panel extends Component {
    constructor(props) {
      super(props);
      this.state = {
        status: false
      };

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleInputCurrencyChange = this.handleInputCurrencyChange.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      this.setState({
        [name]: value,
        status: this.state.data.che
      });
      this.props.onChange(this.state);
      this.setState({
        status: this.state.data.checkData(this.props.step)
      });      
    }

    handleInputCurrencyChange(event, maskedvalue, floatvalue){
      this.setState({ salario: floatvalue });
      this.props.onChange(this.state);
      this.setState({
        status: this.props.data.checkData(this.props.step)
      });      
    }

    next(event){
      this.props.onNext();
    }

    render() {
      return (
        <div className="panel">
          <p>Panel</p>
          <button class="" onClick={this.next}>Pronto</button>
        </div>
      );
    }
}