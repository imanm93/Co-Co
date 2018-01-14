import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react'
import * as actions from '../../actions/fileActions';
import styles from './singlefileuploadformfield.css';

class SingleFileUploadFormField extends Component {

  componentWillMount() {
    this.setState({
      uploadingAttchment: false
    });
  }

  uploadFile = (e) => {
    const { onChange } = this.props.input;
    var file = e.target.files[0]
    var reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      let data = new FormData();
      data.append('files', file);
      this.setState({
        uploadingAttchment: true
      });
      this.props.uploadFile(data, (imageUrl) => {
        onChange(imageUrl);
        this.setState({
          uploadingAttchment: false
        });
      });
    }
    catch(err) {
      console.log(err);
      this.setState({
        uploadingAttchment: false
      });
    }
  }

  openFileExplorer() {
    this.refs['input-file'].click();
  }

  render() {
    return (
      <Grid style={{ margin: 0, marginRight: '1rem' }}>
        <Grid.Column width={16} verticalAlign='middle' textAlign='center' className="coandco-image-input-field" style={{
          backgroundImage: this.props.input.value ? 'url(' + this.props.input.value + ')' : "",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain'
        }}>
          { this.state.uploadingAttchment &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
          }
          <Grid.Row className="coandco-image-input-background">
            { !this.props.input.value &&
              <div style={{ marginTop: '0.75rem' }}>
                  <i className="fa fa-camera" aria-hidden="true"></i>
              </div>
            }
            { this.props.input.value &&
              <div style={{ marginTop: '5.5em' }}>
                <Button circular className="coandco-image-input-btn" type="button" onClick={() => this.openFileExplorer()}><i className="fa fa-paperclip" aria-hidden="true"></i>Add Image</Button>
                <input className="coandco-image-input-file-btn" ref='input-file' type="file" name="image" accept="image/*" onChange={this.uploadFile.bind(this)} />
              </div>
            }
            { !this.props.input.value &&
              <div style={{ marginTop: '0.5rem' }}>
                <Button circular className="coandco-image-input-btn" type="button" onClick={() => this.openFileExplorer()}><i className="fa fa-paperclip" aria-hidden="true"></i>Add Image</Button>
                <input className="coandco-image-input-file-btn" ref='input-file' type="file" name="image" accept="image/*" onChange={this.uploadFile.bind(this)} />
              </div>
            }
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(SingleFileUploadFormField);
