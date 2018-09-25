import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

class Panel extends Component {
    render() {
        const currentPath = this.props.location.pathname.replace('/','');
        return (
            <nav>
                <ul>
                    { this.props.steps && this.props.steps.map((step, i) =>
                        <li
                            key={step.id.toString()} 
                            className={[( currentPath === step.id || ( currentPath === '' && i === 0 ) ? "active" : "" ), ( this.props.panels[step.id] ? "enabled" : "disabled" ) ].join(" ")} 
                            >
                                <Link 
                                    data-index={step.id}
                                    disabled={!this.props.panels[step.id]}
                                    to={ this.props.panels[step.id] ? '/' + step.id :  '' }
                                    ></Link>
                        </li>
                    )}
                </ul>
            </nav> 
        );
    }
}

export default withRouter(Panel)