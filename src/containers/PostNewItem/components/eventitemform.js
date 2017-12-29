import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { required, timeBeforePresent } from '../../../validators';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import dateFormField from '../../../components/DateFormField';
import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';
import singleFileUploadFormField from '../../../components/SingleFileUploadFormField';

class EventItemForm extends Component {

  submit(values) {
    let newValues = {};
    newValues['categoryId'] = 0;
    newValues['skillIds'] = [];
    newValues['cost'] = values.cost;
    newValues['title'] = values.title;
    newValues['photoUrl'] = values.photoUrl;
    newValues['location'] = values.location;
    newValues['description'] = values.description;
    newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    newValues['endTime'] = moment(values.endTime).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['startTime'] = moment(values.startTime).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);
    newValues['eventTypeId'] = Object.keys(this.props.eventTypes).filter(key => this.props.eventTypes[key] === values.eventTypeId)[0];
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
            label='Starts'
            name='startTime'
            dateFormat="DD/MM/YYYY HH:MM:SS"
            component={dateFormField}
            validate={[required, timeBeforePresent]}
          /><br/>
          <Field
            label='Ends'
            name='endTime'
            dateFormat="DD/MM/YYYY HH:MM:SS"
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
          <Field
            name='photoUrl'
            component={singleFileUploadFormField}
          />
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'EventItemForm'
})(EventItemForm);
