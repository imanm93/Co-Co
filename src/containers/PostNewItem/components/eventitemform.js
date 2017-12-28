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
    let newValues = {};
    newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    newValues['eventTypeId'] = values.eventTypeId;
    newValues['categoryId'] = 0;
    newValues['title'] = values.title;
    newValues['description'] = values.description;
    newValues['location'] = values.location;
    newValues['cost'] = values.cost;
    newValues['photoUrl'] = Object.keys(values.attachments).map(key => values.attachments[key].image)[0];
    newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);
    this.props.post(this.props.type, newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    const topicItems = dictToArray(this.props.topicTypes);
    const selectOptions = dictToOptionsForSelect(this.props.eventTypes);
    const radioOptions = [{ text: 'Free', value: 'false' }, { text: 'Paid', value: 'true' }];
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <h3>Post an Event</h3>
          <hr/>
          <h4>1. The Basics</h4>
          <FieldArray
            name='topics'
            label='Who do you want to see this?'
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
            name='eventTypeId'
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
            name='startTime'
            label='Starts'
            component={dateFormField}
            validate={[required, timeBeforePresent]}
          /><br/>
          <Field
            name='endTime'
            label='Ends'
            component={dateFormField}
            validate={[required, timeBeforePresent]}
          /><br/>
          <Field
            name='fee'
            label='Fee'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={radioOptions}
          />
          <Field
            name='cost'
            label=''
            placeholder='Please specify'
            component={inputFormField}
          />
          <hr/>
          <FieldArray
            name='attachments'
            component={fileUploadFormField}
          />
          <FieldArray
            name='photoUrl'
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
