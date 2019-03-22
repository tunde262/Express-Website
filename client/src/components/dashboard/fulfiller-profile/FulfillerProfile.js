import React, { Component } from 'react';

import classes from './FulfillerProfile.module.css';

class FulfillerProfile extends Component {
  render() {
    return (
      <div className={classes.container}>
        <div className={classes.itemGrid}>
            <div className={classes.itemGridContainer}>
                <div className={classes.item}>
                    <div><p style={{color: '#aaa'}}>In Stock<br/><span style={{ fontSize: '2rem', color: '#aaa', fontWeight: '200' }}>7</span><br/> days</p></div>
                    <div><h2 style={{color: '#000'}}>#283596</h2></div>
                </div>
                <div className={classes.item}>
                    <div><p style={{color: '#aaa'}}>In Stock<br/><span style={{ fontSize: '2rem', color: '#aaa', fontWeight: '200' }}>3</span><br/> days</p></div>
                    <div><h2 style={{color: '#000'}}>#958746</h2></div>
                </div>
                <div className={classes.item}>
                    <div><p style={{color: '#aaa'}}>In Stock<br/><span style={{ fontSize: '2rem', color: '#aaa', fontWeight: '200' }}>6</span><br/> days</p></div>
                    <div><h2 style={{color: '#000'}}>#311575</h2></div>
                </div>
                <div className={classes.item}>
                    <div><p style={{color: '#aaa'}}>In Stock<br/><span style={{ fontSize: '2rem', color: '#aaa', fontWeight: '200' }}>6</span><br/> days</p></div>
                    <div><h2 style={{color: '#000'}}>#123456</h2></div>
                </div>
            </div>
        </div>
        <div className={classes.itemRequest}>
            <div>
                <h1>$250</h1>
                <h2>Earned This Week</h2>
            </div>
            <div>
                <h1>1</h1>
                <h2>Box(s) Currently being stored</h2>
            </div>
            <div>
                <h1>0</h1>
                <h2>Boxes that need to be delivered</h2>
            </div>
            <div>
                <h1>2</h1>
                <h2>More boxes assigned to you / On the way!</h2>
            </div>
        </div>
      </div>
    )
  }
}

export default FulfillerProfile;
