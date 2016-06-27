
import React from "react";
import { render } from 'react-dom';
export default class Tab extends React.Component {
	render() {
        return (<div>{this.props.children}</div>)
    }
}