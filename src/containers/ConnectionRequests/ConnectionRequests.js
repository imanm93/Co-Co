import React, { Component } from 'react'; 
import { Grid } from 'semantic-ui-react'; 

import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';  

class ConnectionRequests extends Component {
  componentWillMount() {
    if (!this.props.token) {
      this.redirectToSignIn();
    }
    this.props.fetchConnectionRequests(this.props.token);
  }
  render() { 
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
        </Grid>
         
      </PageContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    api: state.api, 
    token: state.account.token, 
    userId: state.account.userId,  
    profilePhotoUrl: state.account.profilePhotoUrl, 
    connectionRequests: state.connections.requests
  }
}

export default connect(mapStateToProps, actions)(ConnectionRequests);
