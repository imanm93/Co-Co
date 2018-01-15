import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './backgroundimage.css';
import { connect } from 'react-redux';
import * as actions from '../../../actions/fileActions';
import { Button, Dimmer, Loader, Icon } from 'semantic-ui-react';

class BackgroundImage extends Component {

  componentWillMount() {
    this.setState({
      isUploadingImage: false
    });
  }

  handleClick = () => {
    const { value, onChange } = this.props.input;
    var file = document.getElementById('background-profile-picture').files[0]
    var displayArea = document.getElementsByClassName('backgroundSection')
    var reader = new FileReader();
    reader.onload = function (e) {
      displayArea[0].style.backgroundImage = 'url(' + reader.result + ')';
    }
    reader.readAsDataURL(file);
    let data = new FormData();
    data.append('files', file);
    this.setState({
      isUploadingImage: true
    });
    this.props.uploadFile(data, (imageUrl) => {
      this.setState({
        isUploadingImage: false
      }, function() {
        onChange(imageUrl);
      });
    });
  }

  openFileInput = () => {
    this.refs.backgroundImage.click();
  }

  render() {
    return(
      <div>
        <div className="backgroundSection" style={{ backgroundImage: this.props.backgroundImageUrl ? 'url(' + this.props.backgroundImageUrl + ')' : "" }}>
          {this.state.isUploadingImage &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          {this.props.showName && this.props.name &&
            <h1 className="black-overlay">Welcome, {this.props.name}!</h1>
          }
          {this.props.showDiscipline && this.props.discipline &&
            <p className="black-overlay">{this.props.discipline}</p>
          }
          {!this.props.isReadOnly && this.props.useLink &&
            <Link to={this.props.linkTo}>
              <Button circular secondary type="button">
                <Button.Content visible><Icon name="setting" size='small' />{this.props.buttonName}</Button.Content>
              </Button>
            </Link>
          }
          {!this.props.isReadOnly && !this.props.useLink &&
            <Button circular secondary type="button" onClick={this.openFileInput}>
              <label id="uploadBtn" >
                <Button.Content visible><Icon name="camera" size='small' />{this.props.buttonName}</Button.Content>
              </label>
              <input ref="backgroundImage" id="background-profile-picture" type="file" name="backgroundProfilePicture" accept="image/*" onChange={this.handleClick} />
            </Button>
          }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(BackgroundImage);
