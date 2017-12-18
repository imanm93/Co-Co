import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {

  signIn = () => {
    console.log("clicked sign in");
  }

  render() {
    return(
      <div>
        This is the first Landing Page
        <br />
        <Link to='/signup'>
          <button className="coandco-btn">Sign Up</button>
        </Link>
        <Link to='/signin'>
          <button className="coandco-btn">Sign In</button>
        </Link>
      </div>
    )
  }

}

export default connect()(Landing);
