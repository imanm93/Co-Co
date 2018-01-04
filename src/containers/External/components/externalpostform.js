import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PostNewItem from '../../PostNewItem';
import * as ItemTypes from '../../../constants/items/itemTypes';
import ModalContainer from '../../../components/ModalContainer';

class ExternalPostForm extends Component {

  setPostFormTab(type) {
    this.props.setPostFormTab(type);
  }

  render() {
    return(
      <Grid style={{ margin: 0 }}>
        <Grid.Column width={16}>
          <Grid.Row>
            <Grid columns={2} divided>
              <Grid.Column>
                <Button onClick={() => this.setPostFormTab(ItemTypes.OPP_ITEM)}>Opportunity</Button>
                <Button onClick={() => this.setPostFormTab(ItemTypes.EVENT_ITEM)}>Event</Button>
              </Grid.Column>
            </Grid>
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={16}>
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
