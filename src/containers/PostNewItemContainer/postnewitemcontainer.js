import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import PostNewItem from '../PostNewItem';
import PageContainer from '../../components/PageContainer';
import NewPostButton from '../../components/NewPostButton';

class PostNewItemContainer extends Component {

  redirectToHome() {
    this.props.history.push('/dashboard');
  }

  render() {
    return(
      <PageContainer>
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
                  border: '8px solid #2A2A2A',
                  cursor: 'pointer'
                }} onClick={() => this.redirectToHome()}>
                </Grid.Column>
                <Grid.Column width={7}>
                </Grid.Column>
                <Grid.Column width={4}>
                </Grid.Column>
                <Grid.Column width={3} style={{ padding: 0, textAlign: 'center' }}>
                  <Grid.Row>
                    <NewPostButton history={this.props.history} />
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={10}>
            <PostNewItem locationExternal={false} history={this.props.history}/>
          </Grid.Column>
        </Grid>
      </PageContainer>
    )
  }

}

export default connect()(PostNewItemContainer);
