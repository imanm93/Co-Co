import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Grid, Header, Icon, Image, List, Menu, Segment, Visibility } from 'semantic-ui-react'
import styles from './landing.css';

const FixedMenu = () => (
  <Menu fixed='top' size='large' inverted>
    <Container>
      <Menu.Item as='a' active>Home</Menu.Item>
    </Container>
  </Menu>
)

// <Menu.Item as='a'>Services</Menu.Item>
// <Menu.Item as='a'>About Us</Menu.Item>
// <Menu.Menu position='right'>
//   <Menu.Item>
//     <Link to='/signup'>
//       <Button as='a' circular inverted>Sign Up</Button>
//     </Link>
//   </Menu.Item>
//   <Menu.Item className='item'>
//     <Link to='/signin'>
//       <Button as='a' circular inverted>Sign in</Button>
//     </Link>
//   </Menu.Item>
// </Menu.Menu>
// <Button as='a' circular secondary size='large'>Im Still Quite Interested</Button>

class Landing extends Component {

  state = {}

  hideFixedMenu = () => this.setState({ visible: false })
  showFixedMenu = () => this.setState({ visible: true })

  render() {
    const { visible } = this.state;
    return (
      <div>
        { visible ? <FixedMenu /> : null }
        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Segment
            inverted
            textAlign='center'
            style={{
              minHeight: 500,
              padding: '1em 0em',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/bannerand.jpg)'
            }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size='large' style={{ color: '#000' }}>
                <Menu.Item as='a' active>Home</Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '2em 0em', backgroundColor: '#2A2A2A' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row centered>
              <Link to='/external/register'>
                <div className='coandco-external-link'>Businesses - POST YOUR OPPORTUNITY!</div>
              </Link>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em', backgroundColor: '#FFF' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>Mission</Header>
                <p style={{ fontSize: '1.33em' }}>
                Co & Co students is a digital platform to connect students who ‘create’ within educational institutions & outwith industry. A service for students to discover projects, build networks and take part in events to enhance employability.
                  <br/><br/>
                  <b>Watch this space.</b>
                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <object data="http://www.youtube.com/embed/ekJMFj0QIFE" width="560" height="315"></object>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '0em', backgroundColor: '#2A2A2A' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em', color: '#FFF' }}>
                <Grid>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={14} style={{ textAlign: 'left' }}>
                    <Header as='h3' style={{ fontSize: '2em', color: '#FFF' }}>
                      "It seems that Co & Co intends to create a national community of creative graduates in a way that hasn't been achieved before."
                    </Header>
                    <Image avatar style={{ width: '4em', height: '4em', marginTop: '-2em', marginRight: '0.75em' }} src='https://coandco.blob.core.windows.net/systemimagescoandco/files/johnrushworth.png' />
                    <p style={{ fontSize: '1.33em', display: 'inline-block' }}>
                       <b>John Rushworth</b><br/>
                       Partner at Pentagram
                     </p>
                  </Grid.Column>
                  <Grid.Column width={1}>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em', color: '#FFF' }}>
                <Grid>
                  <Grid.Column width={1}>
                  </Grid.Column>
                  <Grid.Column width={14} style={{ textAlign: 'left' }}>
                    <Header as='h3' style={{ fontSize: '2em', color: '#FFF' }}>
                      "If we were to have this service, I think it would be a big help to Academic members of staff"
                    </Header>
                    <Image avatar style={{ width: '4em', height: '4em', marginTop: '-2em', marginRight: '0.75em' }} src='https://coandco.blob.core.windows.net/systemimagescoandco/files/jared-taylor.png' />
                    <p style={{ fontSize: '1.33em', display: 'inline-block' }}>
                      <b>Jared Taylor</b><br/>
                      Director of UG Studies, School of Design
                    </p>
                  </Grid.Column>
                  <Grid.Column width={1}>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em', backgroundColor: '#FFF' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>Launch Event</Header>
            <p style={{ fontSize: '1.33em' }}>
              We are holding a launch event at the firestation on the 6th of February. Invites will be sent out soon!
            </p>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href='#'>Case Studies</a>
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>Hannah & Savannah</Header>
            <p style={{ fontSize: '1.33em' }}>
              Hannah found Savannah on Co & Co. Within 10 minutes they were collaborating in the same studio on Hannahs final year project.
            </p>
            <Header style={{ fontSize: '1.5em' }}>
              "Co & Co gives you the opportunity to work with people that you wouldn't neccesarily meet without it"
            </Header>
            <p style={{ fontSize: '1em' }}>
              <b>Savannah Storm</b><br/>
              Illustration
            </p>
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Home</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Co & Co</Header>
                  <p>Coandco.io (Scotland) Ltd (SC574306) is an independent body not formally associated with an educational institution.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

      </div>
    )
  }
}

export default Landing;
