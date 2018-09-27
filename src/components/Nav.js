import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router'

class Panel extends Component {
    render() {
        const currentPath = this.props.location.pathname.replace('/','');
        const allComplete = Object.values(this.props.panels).indexOf(false) == -1;
        const allIncomplete = Object.values(this.props.panels).indexOf(true) == -1;
        return (
            <nav>
                <ul>
                    { this.props.steps && this.props.steps.map((step, i)=>{
                            const first = i === 0;
                            const last = i === this.props.steps.length - 1;
                            const active = ( currentPath === step.id || ( currentPath === '' && first ));
                            const enabled = this.props.panels[step.id] || ( last && allComplete );

                            return <li
                                    key={step.id.toString()} 
                                    className={[( active ? "active" : "" ), ( enabled ? "enabled" : "disabled" ) ].join(" ")} 
                                    >
                                        <Link 
                                            data-index={step.id}
                                            disabled={!this.props.panels[step.id]}
                                            to={ enabled ? '/' + step.id :  '' }
                                            ></Link>
                                </li>
                        })
                    }
                </ul>
            </nav> 
        );
    }
}

export default withRouter(Panel)