import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { required, timeBeforePresent } from '../../../validators';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import inputFormField from '../../../components/InputFormField';
import dateFormField from '../../../components/DateFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class OppItemForm extends Component {

  submit(values) {
    let newValues = {};
    newValues['title'] = values.title;
    newValues['description'] = values.description;
    newValues['categoryId'] = 0;
    newValues['skillIds'] = Object.keys(values.skills).map(key => values.skills[key].id);
    newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);
    this.props.post(this.props.type, newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    const radioOptions = [{ text: "Unpaid", value: "false" }, { text: "Paid", value: "true" }];
    const selectOptions = dictToOptionsForSelect(this.props.oppTypes);
    const skillItems = dictToArray(this.props.skills);
    const topicItems = dictToArray(this.props.topicTypes);
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
          <h3>Post an Opportunity</h3>
          <hr/>
          <h4>1. The Basics</h4>
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
          <hr/>
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
            component={dateFormField}
            validate={[required, timeBeforePresent]}
          />
          <hr/>
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
  form: 'OppItemForm'
})(OppItemForm);
