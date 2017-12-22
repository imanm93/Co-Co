import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { required } from '../../../validators';
import inputFormField from '../../../components/InputFormField';

class StatusItemForm extends Component {

  submit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit)}>
          <h3>Share your status</h3>
          <hr/>
          <Field
            name='text'
            label=''
            placeholder='Write here'
            component={inputFormField}
            validate={required}
          />
          <hr/>
          <hr/>
          <Button><i class="fa fa-paperclip"></i> Add Media</Button>
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'StatusItemForm'
})(StatusItemForm);
