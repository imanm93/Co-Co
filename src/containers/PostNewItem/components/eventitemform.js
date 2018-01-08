import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { required, timeBeforePresent, timeAfterEnd, timeBeforeStart } from '../../../validators';
import { Grid, Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
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
    newValues['title'] = values.title;
    newValues['photoUrl'] = values.photoUrl;
    newValues['location'] = values.location;
    newValues['description'] = values.description;
    newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    newValues['endDateTime'] = moment(values.endTime).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['startDateTime'] = moment(values.startTime).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['eventTypeId'] = Object.keys(this.props.eventTypes).filter(key => this.props.eventTypes[key] === values.eventTypeId)[0];

    if (values.cost) newValues['cost'] = values.cost;
    if (values.attachments) newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);
    if (this.props.externalEmail) {
      newValues['companyEmail'] = this.props.externalEmail;
      this.props.post(this.props.type, newValues);
    }
    else if (!this.props.externalEmail) {
      this.props.post(this.props.type, newValues);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const topicItems = dictToArray(this.props.topicTypes);
    const selectOptions = dictToOptionsForSelect(this.props.eventTypes);
    const radioOptions = [{ text: 'Free', value: 'false' }, { text: 'Paid', value: 'true' }];
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width={16} style={{ padding: 0, backgroundColor: '#DEDEDE' }}>
            <div className='coandco-post-form-header'>Post an event</div>
          </Grid.Column>
        </Grid>
        <Grid className='coandco-post-form-container'>
          { this.props.isPostingItem &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
          }
          <Grid.Column width={9}>
            <div className='form-section-title'>1. The Basics</div>
            <FieldArray
              name='topics'
              label='What topics are this event about?'
              placholder='e.g. Sustainability'
              component={searchFormField}
              items={topicItems}
            />
            <Field
              name='title'
              label='Title'
              placeholder='e.g. Opening Night at the Wee Red Bar'
              validate={required}
              component={inputFormField}
            />
            <Field
              name='description'
              label='Description'
              placeholder='e.g. About the event'
              validate={required}
              component={inputFormField}
            />
          </Grid.Column>
          <Grid.Column width={7}>
            <Field
              name='photoUrl'
              component={singleFileUploadFormField}
            />
          </Grid.Column>
          <hr className='coandco-form-section-line' />
          <Grid.Column width={9}>
            <div className='form-section-title'>2. More Info</div>
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
              placeholder='e.g. Hunters buidling'
              validate={required}
              component={inputFormField}
            />
            <Field
              label='Starts'
              name='startTime'
              dateFormat="DD/MM/YYYY HH:mm:ss"
              endDateTime={this.props.endDateTime}
              component={dateFormField}
              validate={[required, timeBeforePresent, timeAfterEnd]}
            />
            <Field
              label='Ends'
              name='endTime'
              dateFormat="DD/MM/YYYY HH:mm:ss"
              startDateTime={this.props.startDateTime}
              component={dateFormField}
              validate={[required, timeBeforePresent, timeBeforeStart]}
            />
            <Field
              name='fee'
              label='Fee'
              component={inputFormField}
              InputType={Form.Select}
              validate={required}
              options={radioOptions}
            />
            { this.props.fee && this.props.fee === "true" &&
              <Field
                name='cost'
                label=''
                placeholder='Please specify'
                component={inputFormField}
              />
            }
          </Grid.Column>
          <Grid.Column width={7}>
          </Grid.Column>
          <hr className='coandco-form-section-line' />
          <Grid.Column width={12} textAlign='right' style={{ paddingRight: 0 }}>
            <FieldArray
              name='attachments'
              component={fileUploadFormField}
            />
          </Grid.Column>
          <Grid.Column width={4} textAlign='left' verticalAlign='middle'>
            <Button circular secondary type="submit" className='coandco-post-btn'>Post</Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

const selector = formValueSelector('EventItemForm')
EventItemForm = connect(
  state => {
    const fee = selector(state, 'fee')
    const endDateTime = selector(state, 'endDateTime');
    const startDateTime = selector(state, 'startDateTime');
    return {
      fee,
      endDateTime,
      startDateTime
    }
  }
)(EventItemForm)

export default reduxForm({
  form: 'EventItemForm'
})(EventItemForm);
