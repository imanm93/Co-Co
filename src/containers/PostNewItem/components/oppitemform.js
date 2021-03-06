import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { required, timeBeforePresent } from '../../../validators';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { Grid, Button, Form, Dimmer, Loader, Divider } from 'semantic-ui-react';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import FilterBox from '../../../components/FilterBox';
import dateFormField from '../../../components/DateFormField';
import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class OppItemForm extends Component {

  componentWillMount() {
    this.setState({
      serviceNeeded: 0,
      serviceNeededError: ''
    });
  }

  submit(values) {
    let newValues = {};
    newValues['categoryId'] = 0;
    newValues['title'] = values.title;
    newValues['description'] = values.description;
    let momentEndDate = moment(values.endDate, "DD/MM/YYYY");
    newValues['endDateTime'] = moment(momentEndDate).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['opportunityTypeId'] = Object.keys(this.props.oppTypes).filter(key => this.props.oppTypes[key] === values.opportunityTypeId)[0];

    if (values.reward) newValues['reward'] = values.reward;
    if (values.skills) newValues['skillIds'] = Object.keys(values.skills).map(key => values.skills[key].id);
    if (values.topics) newValues['topicIds'] = values.topics.map(topic => topic.id);
    if (values.attachments) newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);

    newValues['serviceNeeded'] = this.state.serviceNeeded;
    if (newValues['skillIds'] && newValues['skillIds'].length > 0) { newValues['skillIds'] = newValues['skillIds'].concat(this.state.serviceNeeded) }
    else { newValues['skillIds'] = [].concat(this.state.serviceNeeded) }

    if (this.props.externalEmail)
    {
      newValues['companyEmail'] = this.props.externalEmail;
      this.props.post(this.props.type, newValues);
    }
    else if (!this.props.externalEmail)
    {
      newValues['isPaid'] = values.isPaid;
      this.props.post(this.props.type, newValues);
    }
    // newValues['startDateTime'] = moment("01/01/1990").tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    return false;
  }

  onSelectedServiceNeeded(value) {
    if (value) {
      this.setState({
        serviceNeeded: value.id,
        serviceNeededError: ''
      });
    }
    else {
      this.setState({
        serviceNeededError: '*Please select an option from the dropdown'
      });
    }
  }

  onSelectedTopic(value) {
    if (value) {
      this.setState({
        topic: value.id,
        topicError: ''
      });
    }
    else {
      this.setState({
        topicError: '*Please select an option from the dropdown'
      });
    }
  }

  // ignoreDefault(e){
  //     if (e.key === 'Enter') e.preventDefault();
  // }

  render() {
    const { handleSubmit } = this.props;
    const skillItems = dictToArray(this.props.skills);
    const topicItems = dictToArray(this.props.topicTypes);
    const skillOptions = dictToOptionsForSelect(this.props.skills);
    const selectOptions = dictToOptionsForSelect(this.props.oppTypes);
    const radioOptions = [{ text: "Unpaid", value: "false" }, { text: "Paid", value: "true" }];
    return (
      <form onSubmit={handleSubmit(this.submit.bind(this))} >
        <Grid>
          <Grid.Column width={16} style={{ padding: 0, backgroundColor: '#DEDEDE' }}>
            <div className='coandco-post-form-header'>Post an opportunity</div>
          </Grid.Column>
        </Grid>
        <Grid className='coandco-post-form-container'>
          {this.props.isPostingItem &&
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          }
          <Grid.Column width={9}>
            <div className='form-section-title'>1. The Basics</div>
            <div className='coandco-input-field'>
              <div className='coandco-input-label'>What service do you need?</div>
              <FilterBox
                single={true}
                items={skillItems}
                className='form-search'
                placeholder='e.g. Poster Design'
                onSelectedItem={this.onSelectedServiceNeeded.bind(this)}
                onNoMatchFound={this.onSelectedServiceNeeded.bind(this)}
              />
              <span style={{ color: '#E74C3C' }}>{this.state.serviceNeededError}</span>
            </div>
            <Field
              name='title'
              label='Title'
              component={inputFormField}
              placeholder='e.g. Mural Painting for Local Shop'
              validate={required}
            />
            <Field
              rows={4}
              name='description'
              label='Description'
              validate={required}
              InputType={Form.TextArea}
              component={inputFormField}
              placeholder='e.g. The project involves painitng five walls'
            />
          </Grid.Column>
          <Grid.Column width={7}>
          </Grid.Column>
          <Divider style={{ width: '100%', margin: 0 }} />
          <Grid.Column width={9}>
            <div className='form-section-title'>2. More Info</div>
            <Field
              validate={required}
              InputType={Form.Select}
              options={selectOptions}
              name='opportunityTypeId'
              placeholder='e.g. Project'
              component={inputFormField}
              label='What type of opportunity is this?'
            />
            {!this.props.externalEmail &&
              <Field
                name='isPaid'
                label='Is it paid?'
                component={inputFormField}
                InputType={Form.Select}
                validate={required}
                options={radioOptions}
              />
            }
            {this.props.externalEmail &&
              <Field
                name='reward'
                label='Incentivise'
                placeholder='e.g £12 p/h, £50 Amazon voucher, free drinks'
                component={inputFormField}
                validate={required}
              />
            }
            {!this.props.externalEmail && this.props.isPaid && this.props.isPaid === "true" &&
              <Field
                name='reward'
                label=''
                placeholder='e.g £12 p/h, £50 Amazon voucher, free drinks'
                component={inputFormField}
                validate={required}
              />
            }
            <Field
              name='endDate'
              label='When is the deadline?'
              dateFormat="DD/MM/YYYY"
              component={dateFormField}
              validate={[required, timeBeforePresent]}
            />
          </Grid.Column>
          <Grid.Column width={7}>
          </Grid.Column>
          <Divider style={{ width: '100%', margin: 0 }} />
          <Grid.Column width={9}>
            <div className='form-section-title'>3. Add Topics</div>
            <FieldArray
              name='topics'
              label='Target people with the following interests'
              placholder='e.g. Sustainability'
              component={searchFormField}
              items={topicItems}
            />
          </Grid.Column>
          <Grid.Column width={7}>
          </Grid.Column>
          <Divider style={{ width: '100%', margin: 0 }} />
          <Grid.Column width={12} style={{ paddingRight: 0 }} textAlign='right'>
            <FieldArray
              name='attachments'
              component={fileUploadFormField}
            />
          </Grid.Column>
          <Grid.Column width={4} textAlign='left' verticalAlign='top'>
            <Button circular secondary type="submit" className='coandco-post-btn'>Post</Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

// <div className='coandco-input-field'>
//   <div className='coandco-input-label'>Target people with the following interests</div>
//   <FilterBox
//     items={topicItems}
//     className='form-search'
//     onSelectedItem={this.onSelectedTopic.bind(this)}
//     onNoMatchFound={this.onSelectedTopic.bind(this)}
//     placeholder='e.g. Health & Wellbeing'
//   />
//   <span style={{ color: '#E74C3C' }}>{this.state.topicError}</span>
// </div>

const selector = formValueSelector('OppItemForm')
OppItemForm = connect(
  state => {
    const isPaid = selector(state, 'isPaid')
    return {
      isPaid
    }
  }
)(OppItemForm)

export default reduxForm({
  form: 'OppItemForm'
})(OppItemForm);
