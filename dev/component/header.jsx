
import React from "react";
import { render } from 'react-dom';
export default class Header extends React.Component {
	render() {
        return <h2>{this.props.name}</h2>
    }
}