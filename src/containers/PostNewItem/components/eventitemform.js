import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { required, timeBeforePresent } from '../../../validators';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import dateFormField from '../../../components/DateFormField';
import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class EventItemForm extends Component {

  submit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const selectOptions = dictToOptionsForSelect(this.props.eventTypes);
    const topicItems = dictToArray(this.props.topicTypes);
    const radioOptions = [{ text: 'Free', value: 'false' }, { text: 'Paid', value: 'true' }];
    return(
      <form onSubmit={handleSubmit(this.submit)}>
          <h3>Post an Event</h3>
          <hr/>
          <h4>1. The Basics</h4>
          <FieldArray
            name="topics"
            component={searchFormField}
            items={topicItems}
          />
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
          <Field
            name='type'
            label='What type of event is this?'
            placeholder='Please choose'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={selectOptions}
          />
          <Field
            name='location'
            type='text'
            label='Location'
            placholder='Hunters buidling'
            validate={required}
            component={inputFormField}
          /><br/>
          <Field
            name='startDateTime'
            label='Starts'
            component={dateFormField}
            validate={required, timeBeforePresent}
          /><br/>
          <Field
            name='endDateTime'
            label='Ends'
            component={dateFormField}
            validate={required, timeBeforePresent}
          /><br/>
          <Field
            name='paid'
            label='Fee'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={radioOptions}
          />
          <Field
            name='reward'
            label=''
            placeholder='Please specify'
            component={inputFormField}
            validate={required}
          />
          <hr/>
          <FieldArray
            name='attachments'
            component={fileUploadFormField}
          />
          <FieldArray
            name='images'
            component={fileUploadFormField}
          />
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EventItemForm'
})(EventItemForm);
