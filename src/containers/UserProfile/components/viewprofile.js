import React, { Component } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';

import WorkExample from './workexample';
import SocialMediaLink from './socialmedialink';

class ViewProfile extends Component {

  // Background Image compnent
  //   Show current image
  //   Update shows new image

  // Image & Bio component
  //   show current image and Bio
  //   any update changes values passed into compnent

  // Upload Work Examples component
  //   show current work examples
  //   delete current examples

  // Tags
  //   show existing tags
  //   open new add skills component
  //   open new add topics component
  //   on return show updated selections

  // Links
  // Confirm & Save
  //   call patch /Users

  render() {
    return (
      <div>
        <div>Backgraound Image: {this.props.profileViewData.coverPhotoUrl}</div>
        <div>Profile Picture: {this.props.profileViewData.profilePhotoUrl}</div>
        { this.props.userId && this.props.userId === this.props.profileViewData.userId &&
          <Button onClick={this.props.onEdit}>Edit Profile</Button>
        }
        <div>Bio: {this.props.profileViewData.bio}</div>
        <hr/>
        <div>Skills:
        {
          this.props.profileViewData.skills && this.props.profileViewData.skills.slice(3).map(skill => {
            return (<div key={skill}>{skill}</div>)
          })
        }
        </div>
        <div>Interests:
        {
          this.props.profileViewData.topics && this.props.profileViewData.topics.slice(3).map(topic => {
            return (<div key={topic}>{topic}</div>)
          })
        }
        </div>
        <hr/>
        <div>
          <b>Work Examples</b>
          {
            this.props.profileViewData.workExamples && this.props.profileViewData.workExamples.map(we => {
              return (<WorkExample key={we.title} item={we} />)
            })
          }
        </div>
        <hr/>
        <div>Portfolio Link: {this.props.portfolioUrl}</div>
        <div>
          <b>Social Media</b>
          {
            this.props.profileViewData.additionalUrls && Object.keys(this.props.profileViewData.additionalUrls).map(key => {
              return (<SocialMediaLink key={key} name={key} url={this.props.profileViewData.additionalUrls[key]} />)
            })
          }
        </div>
      </div>
    )
  }

}

export default ViewProfile;
