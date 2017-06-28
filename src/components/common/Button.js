import React, { Component } from 'react';

class Button extends Component {


    render() {
        let stylingRules = "";
        stylingRules = this.props.stylingRules ? this.props.stylingRules : "btn btn-primary";
        return <button type="submit" className={stylingRules} onClick={this.props.handleSubmit} >{this.props.title}</button>
    }
}

export default Button;