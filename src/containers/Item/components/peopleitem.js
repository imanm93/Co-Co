import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';

class PeopleItem extends Component {

  render() {
    return (
      <Grid.Row>
        <Grid>
          <Grid.Column width={2}>
          </Grid.Column>
          <Grid.Column width={6}>
            <div className='people-name'>Marc Grainser</div>
            <div className='people-course'>Fashion</div>
          </Grid.Column>
          <Grid.Column width={6}>
            {
              this.props.item.workExamples.map(we => {
                console.log(we);
                return we;
                // return <img src={} alt='Work example' />
              })
            }
          </Grid.Column>
          <Grid.Column width={2}>
            <Button className='item-btn-user-connect' onClick={this.props.onConnect}>Connect</Button>
          </Grid.Column>
        </Grid>
      </Grid.Row>
    )
  }

}

export default PeopleItem;
