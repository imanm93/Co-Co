import React, { Component } from 'react';
import styles from './viewprofile.css';
import { Grid, Button, Image, Tab, List, Item, Label, Divider } from 'semantic-ui-react';

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
                        <Grid centered columns={4}>
                            { this.props.profileViewData.workExamples && this.props.profileViewData.workExamples.length === 0 &&
                              <Divider className="main-content" />
                            }
                            <Grid.Row className="main-content">
                                <Grid.Column width={4}>
                                    <List>
                                        <List.Item>
                                            <List.Header>Skills</List.Header>
                                        </List.Item>
                                        { this.props.profileViewData.skills && Object.keys(this.props.profileViewData.skills).map(skillId => {
                                            return <List.Item key={String(skillId)}>
                                                <Label basic circular size="large">
                                                    {this.props.profileViewData.skills[skillId]}
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
                                        { this.props.profileViewData.interests && Object.keys(this.props.profileViewData.topics).map(topicId => {
                                            return <List.Item key={String(topicId)}>
                                                {this.props.profileViewData.topics[topicId]}
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
                                        {this.props.profileViewData.facebookUrl &&
                                            <List.Item>
                                                <List.Icon name='facebook square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.facebookUrl)}>Facebook</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.twitterUrl &&
                                            <List.Item>
                                                <List.Icon name='twitter square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.twitterUrl)}>Twitter</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.instagramUrl &&
                                            <List.Item>
                                                <List.Icon name='instagram' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.instagramUrl)}>Instagram</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.vimeoUrl &&
                                            <List.Item>
                                                <List.Icon name='vimeo square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.vimeoUrl)}>Vimeo</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.youtubeUrl &&
                                            <List.Item>
                                                <List.Icon name='youtube square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.youtubeUrl)}>Youtube</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.soundcloudUrl &&
                                            <List.Item>
                                                <List.Icon name='soundcloud' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.soundcloudUrl)}>Soundcloud</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.behanceUrl &&
                                            <List.Item>
                                                <List.Icon name='behance square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.behanceUrl)}>Behance</a></List.Content>
                                            </List.Item>
                                        }
                                        {this.props.profileViewData.githubUrl &&
                                            <List.Item>
                                                <List.Icon name='github square' />
                                                <List.Content><a target="_blank" href={makeAbsoluteUrl(this.props.profileViewData.githubUrl)}>Github</a></List.Content>
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.profileViewData !== nextProps.profileViewData;
  }

  render() {
    console.log(this.props.profileViewData);
    const isOwner = this.props.userId === this.props.profileViewData.userId;
    return (
        <Grid.Row>
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={16}>
                        <BackgroundImage
                            useLink={true}
                            showName={true}
                            showDiscipline={true}
                            linkTo="/profile/edit"
                            buttonName="Edit Profile"
                            isOwner={isOwner}
                            isReadOnly={!isOwner}
                            backgroundImageUrl={this.props.profileViewData.coverPhotoUrl}
                            discipline={this.state.isOwner ? this.props.profileViewData.discipline : this.props.profileViewData.discipline || ""}
                            name={this.state.isOwner ? `Welcome, ${this.props.profileViewData.name}` : `${this.props.profileViewData.name || ""}`}
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
