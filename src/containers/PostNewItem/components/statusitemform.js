import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
//import { required } from '../../../validators';
//import inputFormField from '../../../components/InputFormField';

class StatusItemForm extends Component {

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit)}>
          <h3>Share your status</h3>
          <hr/>
          <h4>1. The Basics</h4>
          <hr/>
          <h4>2. More Info</h4>
          <hr/>
          <Button><i class="fa fa-paperclip"></i> Add Media</Button>
          <Button>Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'StatusItemForm'
})(StatusItemForm);
