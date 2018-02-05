import React, { Component } from 'react'
import styles from './landing.css';
import { Link } from 'react-router-dom';
import LandingFeature from './landingfeature';
import { Container, Grid, Segment, Button, Divider, Header, Icon, Image, List, Menu, Visibility, Label } from 'semantic-ui-react';

const FixedMenu = () => (
  <Menu fixed='top' size='large' inverted>
    <Container>
      <Menu.Item as='a' style={{
        backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco_black.png)',
        backgroundSize: 'contain',
        width: '5em'
      }}>
      </Menu.Item>
      <Menu.Item as={Link} to='/signin'>
        Login
      </Menu.Item>
    </Container>
  </Menu>
)

// <object
//   style={{ width: '100%', height: '28em' }}
//   data="http://www.youtube.com/embed/ekJMFj0QIFE"
//   width="560"
//   height="315">
// </object>
// onBottomPassed={this.showFixedMenu}
// onBottomVisible={this.hideFixedMenu}

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
          once={false}
        >
          <Segment
            vertical
            inverted
            textAlign='center'
            style={{ backgroundColor: '#FFF', height: '10%' }}
          >
            <Container>
              <Menu inverted pointing secondary size='large' style={{ color: '#000' }}>
                <Menu.Item as='a' style={{
                  backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/coandco_black.png)',
                  backgroundSize: 'contain',
                  width: '8em',
                  height: '5em',
                  marginTop: '1em',
                  backgroundRepeat: 'no-repeat'
                }}>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ backgroundColor: '#FFF', height: '90%', margin: 0, border: 'none', boxShadow: 'none', paddingBottom: '14%' }}>
          <Container>
            <Label as='a' color='blue' ribbon style={{ width: '102.5%', padding: '1em', borderRadius: 0 }}>
              <Grid>
                <Grid.Column width={13}>
                  <div style={{ fontSize: '18px', marginTop: '0.5em' }}>
                    ‘Connect & Create’ at Edinburgh College of Art // Tuesday February 6th 2017
                  </div>
                </Grid.Column>
                <Grid.Column width={3}>
                  <a href='https://www.eventbrite.co.uk/e/connect-create-tickets-42032780177?aff=eac2'>
                    <Button inverted>Book your ticket!</Button>
                  </a>
                </Grid.Column>
              </Grid>
            </Label>
            <Grid>
              <Grid.Row centered>
                <Grid.Column mobile={16} computer={8} verticalAlign='middle' textAlign='left'>
                  <Grid.Row style={{ height: '10em' }}>
                  </Grid.Row>
                  <Grid.Row>
                    <h1 style={{ fontWeight: 600, fontSize: '50px' }}>
                      The skills sharing platform, connecting you to students who ‘create’ at Edinburgh University.
                    </h1>
                  </Grid.Row>
                  <Grid.Row style={{ height: '10em', paddingTop: '2em' }}>
                    <Grid.Column width={16} verticalAlign='middle'>
                      <Link to='/signin'>
                        <Button circular secondary style={{ backgroundColor: '#2A2A2A', fontSize: '18px' }}>
                          Login
                        </Button>
                      </Link>
                      <Link to='/external/register'>
                        <Button circular secondary style={{ backgroundColor: '#FFF', color: '#000', border: '1px solid', fontSize: '18px' }}>
                          Post an Opportunity to the Creatives!
                        </Button>
                      </Link>
                    </Grid.Column>
                    <Grid.Column width={16} verticalAlign='middle' style={{ padding: '2em 0em', fontSize: '16px' }}>
                      <Link to='/signup' style={{ textDecoration: 'underline', color: '#2A2A2A', fontSize: '18px' }}>
                        Sign Up as a student
                      </Link>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column width={8} style={{ paddingTop: '8em' }}>
                  <Grid.Row centered>
                    <Grid.Column width={10} style={{
                      width: '35em',
                      height: '35.65em',
                      borderRadius: '10px',
                      backgroundSize: 'contain',
                      border: '4px solid #2A2A2A',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/dashbard-default.png)'
                    }}>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment style={{
          paddingBottom: '8em',
          backgroundColor: '#FFF',
          paddingTop: '8em',
          borderTop: '1px solid rgba(34,36,38,.15)'
        }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row centered>
              <Grid.Column width={16} style={{ textAlign: 'left' }}>
                <h1 style={{ fontSize: '50px' }}>Our Mission</h1>
                <p style={{ fontSize: '25px' }}>
                  Co & Co students is a digital platform to connect students who ‘create’ within educational institutions & outwith industry. A service for students to discover projects, build networks and take part in events to enhance employability.
                  <br/><br/>
                  <b>Watch this space.</b>
                </p>
              </Grid.Column>
              <Grid.Column width={10} style={{ paddingTop: '4em' }}>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em', backgroundColor: '#FFF' }} vertical>
          <Container>
            <Grid style={{ margin: 0 }}>
              <Grid.Row centered>
                <Grid.Column width={16} style={{
                  fontWeight: 600,
                  fontSize: '50px',
                  paddingBottom: '2em'
                }}>
                  Features
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  <Grid.Row centered>
                    <Grid.Column width={10} style={{
                      width: '33.5em',
                      height: '35.4em',
                      borderRadius: '10px',
                      backgroundSize: 'contain',
                      border: '4px solid #2A2A2A',
                      backgroundRepeat: 'no-repeat',
                      backgroundImage: 'url(https://coandco.blob.core.windows.net/systemimagescoandco/files/people-default.png)'
                    }}>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Grid.Column mobile={16} computer={8}>
                  <Grid.Row>
                    <Grid style={{ margin: 0 }}>
                      <LandingFeature iconClass='fa fa-dot-circle-o' title='Targeted' text='Target students based on the skills and work that you need.' />
                      <LandingFeature iconClass='fa fa-share' title='Post' text='Post an opportunity to students from Art, Design, Music, & Architecture.' />
                      <LandingFeature iconClass='fa fa-search' title='Explore' text='Find projects and work to get involved with from others around Edinburgh.' />
                      <LandingFeature iconClass='fa fa-graduation-cap' title='Connect' text='Make connections during your time at University, leaving with a solid community to tap into.' />
                    </Grid>
                  </Grid.Row>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Home</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={8} style={{ paddingLeft: '2em' }}>
                  <Header as='h4' inverted>Co & Co</Header>
                  <p>Coandco.io (Scotland) Ltd (SC574306) is an independent body not formally associated with an educational institution.</p>
                  <div>2.0.0</div>
                </Grid.Column>
                <Grid.Column width={6} style={{
                  textAlign: 'right',
                  fontSize: '20px',
                  fontWeight: 600,
                  boxShadow: 'none'
                }}>
                  <i style={{ margin: '0.5em' }} className='fa fa-twitter'></i>
                  <i style={{ margin: '0.5em' }} className='fa fa-facebook'></i>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>

      </div>
    )
  }
}

// <Segment style={{ padding: '0em', backgroundColor: '#2A2A2A' }} vertical>
//   <Grid celled='internally' columns='equal' stackable>
//     <Grid.Row textAlign='center'>
//       <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em', color: '#FFF' }}>
//         <Grid>
//           <Grid.Column width={1}>
//           </Grid.Column>
//           <Grid.Column width={14} style={{ textAlign: 'left' }}>
//             <Header as='h3' style={{ fontSize: '2em', color: '#FFF' }}>
//               "It seems that Co & Co intends to create a national community of creative graduates in a way that hasn't been achieved before."
//             </Header>
//             <Image avatar style={{ width: '4em', height: '4em', marginTop: '-2em', marginRight: '0.75em' }} src='https://coandco.blob.core.windows.net/systemimagescoandco/files/johnrushworth.png' />
//             <p style={{ fontSize: '1.33em', display: 'inline-block' }}>
//                <b>John Rushworth</b><br/>
//                Partner at Pentagram
//              </p>
//           </Grid.Column>
//           <Grid.Column width={1}>
//           </Grid.Column>
//         </Grid>
//       </Grid.Column>
//       <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em', color: '#FFF' }}>
//         <Grid>
//           <Grid.Column width={1}>
//           </Grid.Column>
//           <Grid.Column width={14} style={{ textAlign: 'left' }}>
//             <Header as='h3' style={{ fontSize: '2em', color: '#FFF' }}>
//               "If we were to have this service, I think it would be a big help to Academic members of staff"
//             </Header>
//             <Image avatar style={{ width: '4em', height: '4em', marginTop: '-2em', marginRight: '0.75em' }} src='https://coandco.blob.core.windows.net/systemimagescoandco/files/jared-taylor.png' />
//             <p style={{ fontSize: '1.33em', display: 'inline-block' }}>
//               <b>Jared Taylor</b><br/>
//               Director of UG Studies, School of Design
//             </p>
//           </Grid.Column>
//           <Grid.Column width={1}>
//           </Grid.Column>
//         </Grid>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// </Segment>
// <Header as='h3' style={{ fontSize: '2em' }}>Launch Event</Header>
// <p style={{ fontSize: '1.33em' }}>
//   We are holding a launch event at the firestation on the 6th of February. Invites will be sent out soon!
// </p>
// <Divider
//   as='h4'
//   className='header'
//   horizontal
//   style={{ margin: '3em 0em', textTransform: 'uppercase' }}
// >
//   <a href='#'>Case Studies</a>
// </Divider>
// <Header as='h3' style={{ fontSize: '2em' }}>Hannah & Savannah</Header>
// <p style={{ fontSize: '1.33em' }}>
//   Hannah found Savannah on Co & Co. Within 10 minutes they were collaborating in the same studio on Hannahs final year project.
// </p>
// <Header style={{ fontSize: '1.5em' }}>
//   "Co & Co gives you the opportunity to work with people that you wouldn't neccesarily meet without it"
// </Header>
// <p style={{ fontSize: '1em' }}>
//   <b>Savannah Storm</b><br/>
//   Illustration
// </p>

export default Landing;
