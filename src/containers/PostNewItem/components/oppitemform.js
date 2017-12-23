import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { required, timeBeforePresent } from '../../../validators';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import inputFormField from '../../../components/InputFormField';
import dateFormField from '../../../components/DateFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class OppItemForm extends Component {

  // updateSelectedSkills(skills) {
  //   this.props.selectedSkills['data'] = skills;
  // }

  // updateSelectedTopics(topics) {
  //   this.props.selectedTopics['data'] = topics;
  // }

  submit(values) {
    console.log(values);
    // console.log(this.props.selectedSkills);
    // console.log(this.props.selectedTopics);
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
            name='type'
            label='What type of opportunity is this?'
            placeholder='e.g. Project'
            component={inputFormField}
            InputType={Form.Select}
            validate={required}
            options={selectOptions}
          />
          <Field
            name='paid'
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
            name='endDateTime'
            label='When is the deadline?'
            component={dateFormField}
            validate={required, timeBeforePresent}
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
  form: 'OppItemForm',
  selectedTopics: {},
  selectedSkills: {}
})(OppItemForm);
