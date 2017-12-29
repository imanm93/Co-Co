import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import * as actions from '../../actions/fileActions';

class SingleFileUploadFormField extends Component {

  uploadFile = (e) => {
    const { onChange } = this.props.input;
    var file = e.target.files[0]
    var reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      let data = new FormData();
      data.append('files', file);
      this.props.uploadFile(data, (imageUrl) => {
        onChange(imageUrl);
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div style={{
          backgroundImage: this.props.input.value ? 'url(' + this.props.input.value + ')' : "",
          height: '5rem',
          width: '5rem'
        }}></div>
        <Button type="button">Add Image</Button>
        <input type="file" name="image" accept="image/*" onChange={this.uploadFile.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, actions)(SingleFileUploadFormField);

// {this.props.isUploadingPersonalImage &&
//   <Dimmer active inverted>
//     <Loader />
//   </Dimmer>
// }
