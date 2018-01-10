import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import * as ItemTypes from '../../../constants/items/itemTypes';

import PostNewItem from '../../PostNewItem';
import SimpleModalContainer from '../../../components/SimpleModalContainer';

class ExternalPostForm extends Component {

  componentWillMount() {
    this.setState({
      formState: 'Opportunity'
    });
    if (!this.props.externalEmail) this.props.redirectToVerify();
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
    return(
      <Grid centered style={{ margin: 0 }}>
        <Grid.Column width={16}>
          <Grid.Row style={{ backgroundColor: '#FFF' }}>
            <Grid style={{ height: '3.5em' }}>
              <Grid.Column width={2} style={{
                backgroundSize: 'contain',
                backgroundColor: '#2A2A2A',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco_white.png)',
                border: '6px solid #2A2A2A',
                cursor: 'pointer'
              }} onClick={() => this.props.redirect()}>
              </Grid.Column>
              <Grid.Column width={7}>
              </Grid.Column>
              <Grid.Column width={4}>
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
              <SimpleModalContainer open={true}>
                <Grid style={{ margin: 0 }}>
                  <Grid.Column width={16} style={{ padding: '2em', paddingBottom: 0, fontWeight: 600, fontSize: '15px' }}>
                    <div className='coandco-modal-body'>{this.props.status}</div>
                  </Grid.Column>
                  <Grid.Column width={16} style={{ padding: '2em' }}>
                    <Grid.Row>
                      <Button circular secondary onClick={() => this.props.resetForm()}>Not finished posting opportunities!</Button>
                      <Button circular className='coandco-btn-inverted' style={{ width: '13em !important' }} onClick={() => this.props.redirect()}>Go back to homepage</Button>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </SimpleModalContainer>
          }
        </Grid.Column>
      </Grid>
    )
  }

}

export default ExternalPostForm;
