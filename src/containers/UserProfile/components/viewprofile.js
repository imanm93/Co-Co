import React, { Component } from 'react';
import styles from './viewprofile.css';
import { Grid, Button, Image, Tab, List, Item, Label, Divider, Dimmer, Loader } from 'semantic-ui-react';

import WorkExample from './workexample';
import BackgroundImage from './backgroundimage';
import SocialMediaLink from './socialmedialink';

let makeAbsoluteUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }
    return "http://" + url;
}

class ViewProfile extends Component {

  constructor(props) {
      super(props);
      this.state = {
          panes: [
              {
                menuItem: 'PROFILE', render: () =>
                    <Tab.Pane key={'profilepaneone' + this.props.userId} className="profile-tab" attached={false}>
                        <Grid centered columns={2}>
                            <Grid.Row className="main-content">
                                <Grid.Column width={4}>
                                    <div className="profilePicture" style={{ backgroundImage: this.props.profileViewData.profilePhotoUrl ? 'url(' + this.props.profileViewData.profilePhotoUrl + ')' : "" }}></div>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <h3>{this.props.profileViewData.bio ? this.props.profileViewData.bio : ""}</h3>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        { this.props.userId !== this.props.profileViewData.userId &&
                          <Grid centered>
                            <Grid.Row centered>
                              <Grid.Column width={16} style={{ textAlign: 'center' }}>
                                { this.props.onConnect && !this.props.profileViewData.connectionStatus &&
                                  <Button circular secondary onClick={() => this.props.onConnect(this.props.profileViewData.userId)}>Connect</Button>
                                }
                                { this.props.onConnect && this.props.profileViewData.connectionStatus === 'requestedTo' &&
                                  <Button circular secondary disabled>Pending</Button>
                                }
                                { this.props.onConnect && this.props.profileViewData.connectionStatus === 'connected' &&
                                  <Button circular secondary disabled style={{ backgroundColor: 'green' }}>Connected</Button>
                                }
                                <a href={'mailto:' + this.props.email}>
                                  <Button circular style={{ backgroundColor: '#FFF', color: '#2A2A2A', border: '1px solid #2A2A2A' }}>Email ({this.props.email})</Button>
                                </a>
                              </Grid.Column>
                            </Grid.Row>
                          </Grid>
                        }
                        { this.props.profileViewData.workExamples && this.props.profileViewData.workExamples.length > 0 &&
                            <Grid centered>
                                <Grid.Row centered>
                                    <Grid.Column className="work-examples">
                                        {this.props.profileViewData.workExamples.length > 0 &&
                                            <h4>{this.props.profileViewData.name}s work examples</h4>}
                                        <Item.Group divided>
                                            {this.props.profileViewData.workExamples && this.props.profileViewData.workExamples.map((item, index) => {
                                                return <Item key={index}>
                                                    <Item.Image src={item.mediaUrl} />
                                                    <Item.Content>
                                                        <Item.Header>{item.title}</Item.Header>
                                                        <Item.Description>
                                                            {item.description}
                                                        </Item.Description>
                                                        <Item.Extra>{item.projectUrl}</Item.Extra>
                                                    </Item.Content>
                                                </Item>
                                            })}
                                        </Item.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        }
                        <Grid centered columns={4} style={{ paddingBottom: '4em' }}>
                            { this.props.profileViewData.workExamples && this.props.profileViewData.workExamples.length === 0 &&
                              <Divider className="main-content" />
                            }
                            <Grid.Row className="main-content">
                                <Grid.Column width={4}>
                                    <List>
                                        <List.Item>
                                            <List.Header>Skills</List.Header>
                                        </List.Item>
                                        { this.props.skills && this.props.profileViewData.skills && this.props.profileViewData.skills.map(skillId => {
                                            return <List.Item key={String(skillId)}>
                                                <Label basic circular size="large">
                                                    {this.props.skills[String(skillId)]}
                                                </Label>
                                            </List.Item>
                                        })}
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <List>
                                        <List.Item>
                                            <List.Header>Interests</List.Header>
                                        </List.Item>
                                        { this.props.topics && this.props.profileViewData.topics && this.props.profileViewData.topics.map(topicId => {
                                            return <List.Item key={String(topicId)}>
                                                <Label basic circular size="large">
                                                  {this.props.topics[topicId]}
                                                </Label>
                                            </List.Item>
                                        })}
                                    </List>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <List>
                                        <List.Item>
                                            <List.Header>Portfolio</List.Header>
                                        </List.Item>
                                        <List.Item>
                                            <div>
                                              <a href={makeAbsoluteUrl(this.props.profileViewData.portfolioUrl)}>{this.props.profileViewData.portfolioUrl}</a>
                                            </div>
                                        </List.Item>
                                        <List.Item>
                                            <List.Header style={{ marginTop: "20px" }}>On social media</List.Header>
                                        </List.Item>
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.facebook &&
                                          <List.Item>
                                            <List.Icon name='facebook square' />
                                            <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.facebook)}>Facebook</a></List.Content>
                                          </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.twitter &&
                                            <List.Item>
                                                <List.Icon name='twitter square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.twitter)}>Twitter</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.instagram &&
                                            <List.Item>
                                                <List.Icon name='instagram' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.instagram)}>Instagram</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.vimeo &&
                                            <List.Item>
                                                <List.Icon name='vimeo square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.vimeo)}>Vimeo</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.youtube &&
                                            <List.Item>
                                                <List.Icon name='youtube square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.youtube)}>Youtube</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.soundcloud &&
                                            <List.Item>
                                                <List.Icon name='soundcloud' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.soundcloud)}>Soundcloud</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.behance &&
                                            <List.Item>
                                                <List.Icon name='behance square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.behance)}>Behance</a></List.Content>
                                            </List.Item>
                                        }
                                        { this.props.profileViewData.additionalUrls && this.props.profileViewData.additionalUrls.github &&
                                            <List.Item>
                                                <List.Icon name='github square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.additionalUrls.github)}>Github</a></List.Content>
                                            </List.Item>
                                        }
                                    </List>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Tab.Pane>
              },
              {
                menuItem: 'ACTIVITY', render: () =>
                  <Tab.Pane key={'profilepanetwo' + this.props.userId} attached={false}>
                      Under construction
                  </Tab.Pane>
              }
          ]
      }
  }

  render() {
    const isOwner = this.props.userId === this.props.profileViewData.userId;
    return (
        <Grid.Row>
            <Grid>
                { this.props.isLoadingProfile &&
                  <Dimmer active inverted>
                    <Loader/>
                  </Dimmer>
                }
                <Grid.Row centered>
                    <Grid.Column width={16}>
                        <BackgroundImage
                            useLink={true}
                            showName={true}
                            isOwner={isOwner}
                            isReadOnly={!isOwner}
                            showDiscipline={true}
                            linkTo="/profile/edit"
                            buttonName="Edit Profile"
                            backgroundImageUrl={this.props.profileViewData.coverPhotoUrl}
                            discipline={isOwner ? this.props.profileViewData.discipline : this.props.profileViewData.discipline || ""}
                            name={isOwner ? `${this.props.profileViewData.name}` : `${this.props.profileViewData.name || ""}`}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Tab menu={{ attached: false, borderless: true, widths: 2 }} style={{ backgroundColor: '#FFF' }} panes={this.state.panes} />
        </Grid.Row>
      )
  }
}

export default ViewProfile;
