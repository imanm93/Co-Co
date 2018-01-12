import React, { Component } from 'react';
import styles from './peopleitem.css';
import { Image, Button, Grid } from 'semantic-ui-react';

class PeopleItem extends Component {

  render() {
    return (
      <Grid.Row style={{ backgroundColor: '#FFF' }}>
        <Grid.Column textAlign='center' width={2}>
          <Image avatar style={{
            width: '3em',
            height: '3em'
          }} src={this.props.item.user.profilePhotoUrl} />
        </Grid.Column>
        <Grid.Column width={4} style={{ paddingLeft: 0 }}>
          <div className='people-name'>{this.props.item.user.name}</div>
          <div className='people-course'>{this.props.item.user.courseName}</div>
        </Grid.Column>
        <Grid.Column width={7}>
          {
            this.props.item.workExampleUrls && this.props.item.workExampleUrls.map(we => {
              return <Image style={{
                width: '4em',
                height: '3em',
                borderRadius: 0,
                objectFit: 'cover'
              }} src={we} />
            })
          }
        </Grid.Column>
        <Grid.Column width={3}>
          { !this.props.item.connectionState &&
            <Button circular secondary onClick={this.props.onConnect}><i className='fa fa-link'></i></Button>
          }
          { this.props.item.connectionState === 'initial' &&
            <Button circular secondary onClick={this.props.onConnect}><i className='fa fa-link'></i></Button>
          }
          { this.props.item.connectionState === 'requested' &&
            <Button circular secondary disabled><i className='fa fa-link'></i></Button>
          }
          { this.props.item.connectionState === 'connected' &&
            <Button circular secondary disabled style={{ backgroundColor: 'green' }}><i className='fa fa-link'></i></Button>
          }
          <a circular secondary href={'mailto:'+this.props.item.user.email}><i className="fa fa-envelope" aria-hidden="true"></i></a>
        </Grid.Column>
      </Grid.Row>
    )
  }

}

export default PeopleItem;
