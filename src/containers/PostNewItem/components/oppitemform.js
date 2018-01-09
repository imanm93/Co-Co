import React, { Component } from 'react';
import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { required, timeBeforePresent } from '../../../validators';
import { Grid, Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { dictToArray, dictToOptionsForSelect } from '../../../utils/dictTransforms';

import dateFormField from '../../../components/DateFormField';
import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';
import SearchBox from '../../../components/SearchBox';

class OppItemForm extends Component {

  submit(values) {

    let newValues = {};
    newValues['categoryId'] = 0;
    newValues['title'] = values.title;
    newValues['description'] = values.description;
    newValues['endDateTime'] = moment(values.endDate).tz("Europe/London").format('YYYY-MM-DDTHH:mm:ssZ');
    newValues['opportunityTypeId'] = Object.keys(this.props.oppTypes).filter(key => this.props.oppTypes[key] === values.opportunityTypeId)[0];

    if (values.reward) newValues['reward'] = values.reward;
    if (values.skills) newValues['skillIds'] = Object.keys(values.skills).map(key => values.skills[key].id);
    if (values.topics) newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    if (values.attachments) newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);

    let serviceNeededId = Object.keys(this.props.skills).filter(key => this.props.skills[key] === values.serviceNeeded);
    newValues['serviceNeeded'] = serviceNeededId[0];
    if (newValues['skillIds'] && newValues['skillIds'].length > 0) { newValues['skillIds'] = newValues['skillIds'].concat(serviceNeededId) }
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

  // <SearchBox items={skillItems} onSelectedItem={this.displayselected}/>

  render() {
    const { handleSubmit } = this.props;
    const skillItems = dictToArray(this.props.skills);
    const topicItems = dictToArray(this.props.topicTypes);
    const skillOptions = dictToOptionsForSelect(this.props.skills);
    const selectOptions = dictToOptionsForSelect(this.props.oppTypes);
    const radioOptions = [{ text: "Unpaid", value: "false" }, { text: "Paid", value: "true" }];
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width={16} style={{ padding: 0, backgroundColor: '#DEDEDE' }}>
            <div className='coandco-post-form-header'>Post an opportunity</div>
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
            </Grid.Column>
            <Grid.Column width={7}>
            </Grid.Column>
            <hr className='coandco-form-section-line' />
            <Grid.Column width={9}>
              <div className='form-section-title'>2. More Info</div>
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
              { this.props.isPaid && this.props.isPaid === "true" &&
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
            <hr className='coandco-form-section-line' />
            <Grid.Column width={9}>
              <div className='form-section-title'>3. Add Topics</div>
              <FieldArray
                name='topics'
                label='Target people with the following interests'
                placholder='e.g. Health & Wellbeing'
                component={searchFormField}
                items={topicItems}
              />
            </Grid.Column>
            <Grid.Column width={7}>
            </Grid.Column>
            <hr className='coandco-form-section-line' />
            <Grid.Column width={12} style={{ paddingRight: 0 }}>
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

// <FieldArray
//   name='skills'
//   label='Target people with the following skills'
//   placholder='e.g. Adobe Photoshop'
//   component={searchFormField}
//   items={skillItems}
// />

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
