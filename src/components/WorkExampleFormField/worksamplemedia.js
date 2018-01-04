import React, { Component } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class WorkSampleMedia extends Component {

    handleClick = () => {
        const { value, onChange } = this.props.input;
        var file = document.getElementById(this.props.componentId).files[0]
        var displayArea = document.getElementById(`display-area-${this.props.componentId}`);
        var reader = new FileReader();
        reader.onload = function (e) {
            displayArea.style.backgroundImage = 'url(' + reader.result + ')';
        }
        reader.readAsDataURL(file);
        let data = new FormData();
        data.append('files', file);
        this.props.uploadBackgroundImage(data, (imageUrl) => {
            onChange(imageUrl);
        });
    }

    openFileInput = () => {
        this.refs.workSampleMediaInput.click();
    }

    componentDidMount() {
        const { value, onChange } = this.props.input;
        var displayArea = document.getElementById(`display-area-${this.props.componentId}`);
        displayArea.style.backgroundImage = 'url(' + value + ')';
    }

    render() {
        const { value, onChange } = this.props.input;
        return (
            <div id={`display-area-${this.props.componentId}`} className="image-container">
                <div className="workImg">
                    <div className="profile-image-buttons">
                        <Button type="button" circular secondary  onClick={this.openFileInput}>
                            <label className="upload-button">
                                <Button.Content visible><Icon name="camera" size='small' />Upload image, sound file</Button.Content>
                            </label>
                            <input ref="workSampleMediaInput" className="input-upload" id={this.props.componentId} type="file"
                                name={this.props.componentId} accept="image/*" onChange={this.handleClick.bind(this)} />
                        </Button>
                        {
                          /* TODO: <Button type="button" circular secondary><Icon name="video camera" />Enter video url</Button> */
                        }
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, actions)(WorkSampleMedia);
