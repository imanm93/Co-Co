import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
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

  onRemove(index) {
    const { fields } = this.props;
    fields.remove(index);
  }

  render() {
    const { fields } = this.props;
    const files = fields.getAll();
    return(
      <div>
        <Button>Add Files</Button>
        <input type='file' onChange={this.uploadFile.bind(this)} />
        { files && files.length > 0 &&
            files.map((file, index) => {
              return <div key={index}>{file.image} <button type="button" onClick={() => this.onRemove(index)}>X</button></div>
            })
        }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(FileUploadFormField);
