import React, { Component } from "react";

export default class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: !!this.props.value,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const value = !this.state.status;

    this.setState({
      status: value,
    });
    this.props.onChange(value);
  }

  render() {
    return (
      <div className="checkbox-wrapper">
        {this.props.children && <label>{this.props.children}</label>}
        <button
          className={["checkbox", this.state.status ? "checked" : ""].join(" ")}
          onClick={this.handleChange}
        ></button>
      </div>
    );
  }
}
