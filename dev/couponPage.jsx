import React from 'react';
import { render } from 'react-dom';
import Header from './header.jsx';
import Tab from './tab.jsx';
import TabsControl from './tabsControl.jsx';
export default class CouponPage extends React.Component {
  var headerdata = "My Coupon";
  var data =  ['red', 'green', 'blue','4','5','6'];
  var data1 =  ['red', 'green' ];
  var data2 =  ['red', 'green', 'blue'];
  render( 
    <div>
      <Header name={headerdata}/>
      <div className="b-mod">
        <TabsControl>
          <Tab name="Available" number="13" numCls="count count-a" content={data}/>
          <Tab name="Expired" number="5" numCls="count count-e" content={data1}/>
          <Tab name="Used" number="7" numCls="count count-u" content={data2}/>
        </TabsControl>
      </div>
    </div>
  )
}


