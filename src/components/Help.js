import React, { Component } from 'react';

export default class Help extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        this.setState({ open: !this.state.open });
    }

    render(){
        var status = this.state.open ? "opened" : "closed" ;
        var button = this.state.open ? "[x]" : "[?]" ;
        return (
            <div className={['help', status].join(" ")}>
                <div className="header" onClick={this.onClick}>
                <span className="text">{this.props.header}</span><span className="close">{button}</span>
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}