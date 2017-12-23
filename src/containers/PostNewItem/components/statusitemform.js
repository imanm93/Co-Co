import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { required } from '../../../validators';
import { dictToArray } from '../../../utils/dictTransforms';

import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../component/FileUploadFormField';

class StatusItemForm extends Component {

  submit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const topicItems = dictToArray(this.props.topicTypes);
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
          <FieldArray
            name='topics'
            component={searchFormField}
            items={topicItems}
          />
          <hr/>
          <FieldArray
            name='attachments'
            component={fileUploadFormField}
          />
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'StatusItemForm'
})(StatusItemForm);
