import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Button, Form, Grid, Dimmer, Loader } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { required, timeBeforePresent } from '../../../validators';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import dateFormField from '../../../components/DateFormField';
import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class OppItemForm extends Component {

  submit(values) {
    let newValues = {};

    newValues['categoryId'] = 0;
    newValues['title'] = values.title;
    newValues['reward'] = values.reward;
    newValues['description'] = values.description;
    newValues['endDateTime'] = moment(values.endDate).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['opportunityTypeId'] = Object.keys(this.props.oppTypes).filter(key => this.props.oppTypes[key] === values.opportunityTypeId)[0];

    if (values.skills) newValues['skillIds'] = Object.keys(values.skills).map(key => values.skills[key].id);
    if (values.topics) newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    if (values.attachments) newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);

    let serviceNeededId = Object.keys(this.props.skills).filter(key => this.props.skills[key] === values.serviceNeeded);
    if (newValues['skillIds'].length > 0) { newValues['skillIds'] = newValues['skillIds'].concat(serviceNeededId) }
    else { newValues['skillIds'] = [].concat(serviceNeededId) }

    if (this.props.externalEmail) {
      newValues['companyEmail'] = this.props.externalEmail;
      this.props.post(this.props.type, newValues);
    }
    else if (!this.props.externalEmail) {
      newValues['startDateTime'] = moment("01/01/1990").tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
      newValues['isPaid'] = values.isPaid;
      this.props.post(this.props.type, newValues);
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const skillItems = dictToArray(this.props.skills);
    const topicItems = dictToArray(this.props.topicTypes);
    const skillOptions = dictToOptionsForSelect(this.props.skills);
    const selectOptions = dictToOptionsForSelect(this.props.oppTypes);
    const radioOptions = [{ text: "Unpaid", value: "false" }, { text: "Paid", value: "true" }];
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
          { this.props.isPostingItem &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
          }
          <h3>Post an Opportunity</h3>
          <h4>1. The Basics</h4>
          <Field
            name='serviceNeeded'
            label='What service do you need?'
            placeholder='Please choose'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={skillOptions}
          />
          <Field
            name='title'
            label='Title'
            placeholder='e.g. Mural Painting for Local Shop'
            component={inputFormField}
            validate={required}
          />
          <Field
            name='description'
            label='Description'
            placeholder='e.g. The project involves painitng five walls'
            component={inputFormField}
            validate={required}
          />
          <h4>2. More Info</h4>
          <Field
            name='opportunityTypeId'
            label='What type of opportunity is this?'
            placeholder='e.g. Project'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={selectOptions}
          />
          <Field
            name='isPaid'
            label='Is it paid?'
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
          <Field
            name='endDate'
            label='When is the deadline?'
            dateFormat="DD/MM/YYYY"
            component={dateFormField}
            validate={[required, timeBeforePresent]}
          />
          <h4>3. Target</h4>
          <p>Target people with the following skills</p>
          <FieldArray
            name='skills'
            label='Target people with the following skills'
            component={searchFormField}
            items={skillItems}
          />
          <p>Target people with the following interests</p>
          <FieldArray
            name='topics'
            label='Target people with the following interests'
            component={searchFormField}
            items={topicItems}
          />
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
  form: 'OppItemForm'
})(OppItemForm);
