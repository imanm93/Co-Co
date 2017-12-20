import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { required, timeBeforePresent } from '../../../validators';
import inputFormField from '../../../components/InputFormField';
import dateFormField from '../../../components/DateFormField';
import Search from '../../../components/Search';

class OppItemForm extends Component {

  submit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;
    const options = [{
      key: "0",
      value: "test",
      text: "test"
    },
    {
      key: "1",
      value: "testing",
      text: "testing"
    },
    {
      key: "2",
      value: "tested",
      text: "tested"
    }];
    const radioOptions = [{
      text: "Unpaid",
      value: "false"
    },
    {
      text: "Paid",
      value: "true"
    }];
    const skillItems = [{
      id: 0,
      name: 'poster'
    }];
    const topicItems = [{
      id: 0,
      name: 'poster'
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
          <Search items={skillItems} placeholder="Start typing skills" />
          <p>Target people with the following interests</p>
          <Search items={topicItems} placeholder="Start typing interests" />
          <hr/>
          <Button>Add Media</Button>
          <Button type="submit">Post</Button>
      </form>
    )
  }

}

export default reduxForm({
  form: 'OppItemForm'
})(OppItemForm);
