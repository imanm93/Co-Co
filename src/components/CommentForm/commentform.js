import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { reduxForm, Field, Form } from 'redux-form';

import inputFormField from '../InputFormField';

class CommentForm extends Component {

  submit(values) {
    this.props.onPostComment(values);
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field
          name='text'
          component={inputFormField}
          InputType={Form.TextArea}
        />
        <Button type='submit' secondary style={{ margin: '0.5em' }}>Add Comment</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'CommentForm'
})(CommentForm)
