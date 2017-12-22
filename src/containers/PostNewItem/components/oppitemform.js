import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { required, timeBeforePresent } from '../../../validators';
import inputFormField from '../../../components/InputFormField';
import dateFormField from '../../../components/DateFormField';
import searchFormField from '../../../components/SearchFormField';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

class OppItemForm extends Component {

  onSelectedTopic(topic) {
    console.log(topic);
  }

  submit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const options = dictToOptionsForSelect(this.props.oppTypes);
    const skillItems = dictToArray(this.props.skills);
    const topicItems = dictToArray(this.props.topicTypes);
    const radioOptions = [{
      text: "Unpaid",
      value: "false"
    },
    {
      text: "Paid",
      value: "true"
    }];
    return(
      <form onSubmit={handleSubmit(this.submit)}>
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
            options={options}
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
            name='enddate'
            label='When is the deadline?'
            component={dateFormField}
            validate={required, timeBeforePresent}
          />
          <hr/>
          <h4>3. Target</h4>
          <p>Target people with the following skills</p>
          <Field
            name='skills'
            label='Target people with the following skills'
            component={searchFormField}
            items={skillItems}
            selectedItems={this.props.selectedSkills}
          />
          <p>Target people with the following interests</p>
          <Field
            name='topics'
            label='Target people with the following interests'
            component={searchFormField}
            items={topicItems}
            selectedItems={this.props.selectedTopics}
          />
          <hr/>
          <Button>Add Media</Button>
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

// <Search placeholder="Start typing skills" items={skillItems} onSelectedItem={this.onSelectedSkill.bind(this)} />
// <Search placeholder="Start typing interests" items={topicItems} onSelectedItem={this.onSelectedTopic.bind(this)} />

export default reduxForm({
  form: 'OppItemForm',
  selectedTopics: new Set(),
  selectedSkills: new Set()
})(OppItemForm);
