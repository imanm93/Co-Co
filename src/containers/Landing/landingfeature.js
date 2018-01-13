import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class LandingFeature extends Component {

  render() {
    return(
      <Grid.Column width={8} style={{ paddingTop: '25px', paddingBottom: '25px', textAlign: 'center' }}>
        <div className='coandco-landing-feature-icon'>
          <i className={this.props.iconClass} aria-hidden='true'></i>
        </div>
        <div className='coandco-landing-feature-title'>
          {this.props.title}
        </div>
        <div className='coandco-landing-feature-description'>
          {this.props.text}
        </div>
      </Grid.Column>
    )
  }

}

export default LandingFeature;
