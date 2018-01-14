import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Icon, Grid } from 'semantic-ui-react';
import styles from './fileuploadformfield.css';
import * as actions from '../../actions/fileActions';

class FileUploadFormField extends Component {

  componentWillMount() {
    this.setState({
      uploadingAttchment: false
    })
  }

  uploadFile(e) {
    const { fields } = this.props;
    const file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      let data = new FormData();
      data.append('files', file);
      this.setState({
        uploadingAttchment: true
      });
      this.props.uploadFile(data, (image) => {
        let length = fields.length;
        fields.push({ image, name: file.name, number: length + 1 });
        this.setState({
          uploadingAttchment: false
        });
      });
    }
    catch (err) {
      console.log(err);
      this.setState({
        uploadingAttchment: false
      });
    }
  }

  onRemove(index) {
    const { fields } = this.props;
    fields.remove(index);
  }

  openFileExplorer() {
    this.refs['multiple-input-file'].click();
  }

  render() {
    const { fields } = this.props;
    const files = fields.getAll();
    return(
      <Grid>
        <Grid.Column width={10}>
          <Grid.Row style={{ padding: 0 }}>
            { files && files.length > 0 &&
                files.map((file, index) => {
                  return <Label as='a' style={{
                    borderRadius: '69px',
                    backgroundColor: 'transparent',
                    border: '1px solid #2A2A2A',
                    color: '#2a2a2a',
                    margin: '0.5em 0.25em'
                 }}>
                  {file.name}
                  <Icon name='delete' onClick={() => this.onRemove(index)} style={{
                    color: 'red'
                  }}/>
                </Label>
              })
            }
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row>
            <Button type='button' circular className='coandco-btn-inverted' onClick={() => this.openFileExplorer()} loading={this.state.uploadingAttchment}>
              <i className='fa fa-paperclip'></i>Add Files
            </Button>
            <input ref='multiple-input-file' className='coandco-file-input-file-btn' type='file' onChange={this.uploadFile.bind(this)} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(FileUploadFormField);
