import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { FILE_UPLOAD_URL } from '../../constants/file/fileEndpoints';
import * as actions from '../../actions/fileActions';

class FileUploadFormField extends Component {

  uploadFile(e) {
    const { fields } = this.props;
    const file = e.target.files[0];
    let reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      let data = new FormData();
      data.append('files', file);
      this.props.uploadFile(data, (image) => {
        let length = fields.length;
        fields.push({ image, number: length + 1 });
      });
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    return(
      <div>
        <Button>Add Files</Button>
        <input type='file' onChange={this.uploadFile.bind(this)} />
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(FileUploadFormField);
