
import React from "react";
import { render } from 'react-dom';
import ContentList from './contentList.jsx';
export default class TabsControl extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			currentIndex: 0
		};
	}
  getTitleItemCssClasses(index){
    return index === this.state.currentIndex ? "tab active" : "tab";
  }
  getContentItemCssClasses(index){
    switch(index) {
      case 0: return index === this.state.currentIndex ? "coupon-lists coupon-a show" : "coupon-lists coupon";
      break;
      case 1: return index === this.state.currentIndex ? "coupon-lists coupon-e show" : "coupon-lists coupon";
      break;
      case 2: return index === this.state.currentIndex ? "coupon-lists coupon-u show" : "coupon-lists coupon"
      break;
    }
  }
  render() {
    return (
        <div>
          <div id="ui-tab-s" className="ui-tab-self" >
              {React.Children.map(this.props.children, (element, index) => {
                return (<div onClick={() => {this.setState({currentIndex: index})}} className={this.getTitleItemCssClasses(index)}>{element.props.name}<span className={element.props.numCls}>{element.props.number}</span></div>)
              })}
          </div>
          <div className="tab-content">
              {React.Children.map(this.props.children, (element, index) => {
                return (<ContentList data={element.props.content} className={this.getContentItemCssClasses(index)}/>)
              })}
          </div>
        </div>
      )
   }
}
