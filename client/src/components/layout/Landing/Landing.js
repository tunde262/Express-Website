import React, { Component } from 'react';
import './main';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import classes from './Landing.module.css';

class Landing extends Component {

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
        <div style={{height: '100vh'}}>
          <div className={classes.container}>
            
              <h1>Hi we're <br/>
                <div className={classes.cursor}><span className="txt-type" data-wait="3000" data-words='["Cardboard Express", "a last-delivery marketplace"]'></span></div>
              </h1>
            <h2>Your customers want things delivered fast..... We can help you with that. </h2>
            <h2>Cardboard Express is a last mile delivery marketplace that connects online stores with fulfillers.</h2>
            <h2>Store your inventory within the same neighborhoods as your customers</h2>
            <h2>We will take care of the rest and get them delivered minutes after purchase.</h2>
          </div>
        </div>
        <div className={classes.info}>
          <div>
            <i className="fas fa-shipping-fast"></i>
            <hr />
            <p>Ship your pre-packaged items to the homes of our fulfillers</p>
          </div>
          <div>
            <i className="fas fa-boxes"></i>
            <hr />
            <p>Our fulfillers will keep your items safe in there homes until they are ordered</p>
          </div>
          <div>
            <i className="fas fa-running"></i>
            <hr />
            <p>When an item has been ordered by your customer out fulfiller will deliver it straight to their doorstep</p>
          </div>
          <div>
            <i className="fas fa-search-location"></i>
            <hr />
            <p>Get instant updates about your items status and watch the items delivery on a map in realtime on your dashboard</p>
          </div>
        </div>
        <h1 style={{textAlign: 'center'}}>How You Benefit</h1>
        <div className={classes.how_works}>
          <div className={classes.how1}>
            <h1>Put your feet up and relax!</h1>
            <h2>Since you ship your products out in advance you never have to rush through or fall behind in your fulfillment process ever again. Take your time!</h2>
          </div>
          <div className={classes.picture1}></div>
          <div className={classes.how2}>
            <h1>Enjoy the love!!</h1>
            <h2>Since your products are already pre-packed and ready to go in multiple homes close to your customers, don't just suprise, but exceed your customers expectations with seemingly instant delivery!</h2>
          </div>
          <div className={classes.picture2}></div>
          <div className={classes.how3}>
            <h1>Peace of Mind:)</h1>
            <h2>Both you and customers can enjoy complete transparency when it come to the status and location of product in delivery. Cozzy up with your shoppers and watch in real-time as the package arrives at their doorstep!</h2>
          </div>
          <div className={classes.picture3}></div>
          <div className={classes.how4}>
            <h1>Count Your Savings!</h1>
            <h2>Save money on shipping by sending multiple items to one location at once.</h2>
          </div>
          <div className={classes.picture4}></div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
