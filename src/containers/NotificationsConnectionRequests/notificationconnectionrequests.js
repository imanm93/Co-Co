import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Grid, Button, Image, Label, Card } from 'semantic-ui-react';

import PageContainer from '../../components/PageContainer';
import NavBar from '../NavBar';

class NotificationConnectionRequests extends Component {

  componentWillMount() {
    if (!this.props.token) {
      this.redirectToSignIn();
    }
    this.props.fetchConnectionRequests(this.props.token);
  }

  onAcceptConnection(requestId) {
    console.log("accepted");
    this.props.postFromNotifcationsAcceptConnection(this.props.token, this.props.userId, requestId);
  }

  onRejectConnection(requestId) {
    console.log("rejected");
    this.props.postFromNotifcationsRejectConnection(this.props.token, this.props.userId, requestId);
  }

  render() {
    console.log(this.props.connectionRequests);
    return (
      <PageContainer>
        <Grid style={{ margin: 0 }}>
          <NavBar history={this.props.history} profilePhotoUrl={this.props.profilePhotoUrl} />
        </Grid>
        <Card fluid>
          <Card.Content style={{ backgroundColor: '#E6E6E6' }}>
            <Card.Header>
              Connection Requests
            </Card.Header>
          </Card.Content>
          { this.props.connectionRequests && this.props.connectionRequests.map(cr => {
            return <Card.Content>
              <Grid>
                <Grid.Column width={1} style={{ paddingTop: '1.25em' }}>
                  <Image avatar src={cr.profilePhotoUrl} />
                </Grid.Column>
                <Grid.Column width={10} style={{ paddingTop: '1.5em' }}>
                  {cr.firstName} {cr.lastName}
                </Grid.Column>
                <Grid.Column width={5} textAlign='right'>
                  { cr.status === 'accepted' &&
                    <Label>Accepted</Label>
                  }
                  { cr.status === 'rejected' &&
                    <Label>Rejected</Label>
                  }
                  { (!cr.status || cr.status === 'default') &&
                    <Button circular secondary style={{ backgroundColor: 'lightgreen' }} onClick={() => this.onAcceptConnection(cr.userId)}>Accept</Button>
                  }
                  { (!cr.status || cr.status === 'default') &&
                    <Button circular secondary style={{ backgroundColor: 'red' }} onClick={() => this.onRejectConnection(cr.userId)}>Reject</Button>
                  }
                </Grid.Column>
              </Grid>
            </Card.Content>
          })
        }
        </Card>
      </PageContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    api: state.api,
    token: state.account.token,
    userId: state.account.userId,
    connectionRequests: state.connections.requests,
    profilePhotoUrl: state.account.profilePhotoUrl
  }
}

export default connect(mapStateToProps, actions)(NotificationConnectionRequests);
