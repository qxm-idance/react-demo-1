
import React from "react";
import { render } from 'react-dom';
export default class ContentList extends React.Component {
  render() {
    return (
      <ul className={this.props.className}>
        {
          this.props.data.map(function(item,i){
            return (<li key={i}>
              <div className="wrapper">
                <div className="item">
                    <span className="icon icon-cash"></span>
                    <p className="money">€250.00</p>
                    <p className="des">Available only when consumption </p>
                    <p className="des">of XXXX is over €100.00</p>
                    <p className="icon-bk-bt"></p>
                </div>
                <div className="date">
                    <p>22/01/2015—22/01/2015</p>
                </div>
              </div>
            </li>)
          })                 
        }
      </ul>
    )
  }
}