import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import * as ItemTypes from '../../../constants/items/itemTypes';

import PostNewItem from '../../PostNewItem';
import FormContainer from '../../../components/FormContainer';
import ModalContainer from '../../../components/ModalContainer';

class ExternalPostForm extends Component {

  componentWillMount() {
    this.setState({
      formState: 'Opportunity'
    });
  }

  setPostFormTab(type) {
    if (this.state.formState === 'Event') {
      this.setState({
        formState: 'Opportunity'
      }, function() {
        this.props.setPostFormTab(type);
      });
    }
    else {
      this.setState({
        formState: 'Event'
      }, function() {
        this.props.setPostFormTab(type);
      });
    }
  }

  render() {
    if (!this.props.externalEmail) this.props.redirectToVerify();
    return(
      <Grid centered style={{ margin: 0 }}>
        <Grid.Column width={16}>
          <Grid.Row style={{ backgroundColor: '#FFF' }}>
            <Grid>
              <Grid.Column width={3} style={{
                backgroundSize: 'contain',
                backgroundColor: '#2A2A2A',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco_white.png)',
                border: '8px solid #2A2A2A'
              }}>
              </Grid.Column>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={9}>
              </Grid.Column>
              <Grid.Column width={3} textAlign='center' verticalAlign='middle'>
                { this.state.formState === 'Opportunity' &&
                  <Button circular secondary onClick={() => this.setPostFormTab(ItemTypes.EVENT_ITEM)}>Post event</Button>
                }
                { this.state.formState === 'Event' &&
                  <Button circular secondary onClick={() => this.setPostFormTab(ItemTypes.OPP_ITEM)}>Post opportunity</Button>
                }
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={10} style={{ paddingBottom: '5rem' }}>
          <PostNewItem locationExternal={true} externalEmail={this.props.externalEmail} />
          { this.props.status &&
              <ModalContainer open={true}>
                <div>{this.props.status}</div>
                <Button onClick={() => this.props.resetForm()}>Not finished posting opportunities!</Button>
                <Button onClick={() => this.props.redirect()}>Go back to homepage</Button>
              </ModalContainer>
          }
        </Grid.Column>
      </Grid>
    )
  }

}

export default ExternalPostForm;
