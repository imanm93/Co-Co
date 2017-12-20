import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class EventItemForm extends Component {

  //TODO: Dropdown form items

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit)}>
          <h3>Post an Event</h3>
          <hr/>
          <h4>1. The Basics</h4>
          <hr/>
          <Field
            name='title'
            type='text'
            label='Title'
            placholder='e.g. Opening Night at the Wee Red Bar'
            validate={required}
            component={inputFormField}
          /><br/>
          <Field
            name='description'
            type='text'
            label='Description'
            placholder='e.g. About the event'
            validate={required}
            component={inputFormField}
          /><br/>
          <hr/>
          <h4>2. More Info</h4>
          <hr/>
          <h4>3. Target</h4>
          <hr/>
          <Button><i class="fa fa-paperclip"></i> Add Media</Button>
          <Button>Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EventItemForm'
})(EventItemForm);
