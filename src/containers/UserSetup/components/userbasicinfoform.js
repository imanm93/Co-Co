import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { required } from '../../../validators';
import { connect } from 'react-redux';
import { Grid, Divider, Button, Form } from 'semantic-ui-react';
import inputFormField from '../../../components/InputFormField'
import FilterBox from '../../../components/FilterBox';

class UserBasicInfoForm extends Component {

  onSubmit(values) {
    let newValues = {};
    newValues = Object.assign({}, values);
    delete newValues['degree'];
    if (this.state.courseId) {
      newValues['courseId'] = this.state.courseId;
      this.props.updateBasicInfo(newValues);
      this.props.onNext();
    }
  }

  componentWillMount() {
      this.setState({
        courseId: 0,
        courseError: ''
      });
  }

  onSelectedServiceNeeded(value) {
    if (value) {
      this.setState({
        courseId: value.id,
        courseError: ''
      });
    }
    else {
      this.setState({
        courseId: 0,
        courseError: '*Please select an option from the dropdown'
      });
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const years = this.props.setupData.years.map(year => {
      return {
        key: year.id,
        value: year.id,
        text: year.value
      }
    });
    let courseDegrees = {};
    const courses = this.props.setupData.courses.map(course => {
      courseDegrees = Object.assign({}, courseDegrees, { [course.degree]: course.id });
      return course;
    });
    const courseDegreeOptions = Object.keys(courseDegrees).map(courseDegree => {
      return {
        key: courseDegree,
        value: courseDegree,
        text: courseDegree
      }
    });
    const signUpSources = this.props.setupData.signUpSources.map(source => {
      return {
        key: source.id,
        value: source.id,
        text: source.name
      };
    })
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Grid>
          <Grid.Column width ={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <div className='form-header'>Step 1/4: Lets setup your account</div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>1. The Basics</div>
            <Grid.Row>
              <Grid>
                <Grid.Column width={8}>
                  <Field
                    name='firstName'
                    label='Your First Name'
                    placeholder='Firstname'
                    component={inputFormField}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name='lastName'
                    label='Your Last Name'
                    placeholder='Lastname'
                    component={inputFormField}
                    validate={[required]}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <div className='form-section-title'>2. A bit about you</div>
            <Grid.Row>
              <Grid>
                <Grid.Column width={4}>
                  <Field
                    name='degree'
                    label='Degree'
                    placeholder='Please Choose'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={courseDegreeOptions}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={12}>
                  { this.props.degree &&
                    <div className='coandco-input-field'>
                      <div className='coandco-input-label'>Course</div>
                      <FilterBox
                        items={
                          courses.filter(c => c.degree === this.props.degree).map(item => {
                            return {
                              id: item.id,
                              name: item.name
                            }
                          })
                        }
                        single={true}
                        placeholder='Please choose'
                        onSelectedItem={this.onSelectedServiceNeeded.bind(this)}
                      />
                      { this.state.courseId === 0 &&
                        <span style={{ color: '#E74C3C' }}>*this field is required</span>
                      }
                    </div>
                  }
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: '0em 1em' }}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={4}>
                  <Field
                    name='graduationYear'
                    label='When do you graduate?'
                    placeholder='Year'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={years}
                    validate={[required]}
                  />
                </Grid.Column>
                <Grid.Column width={4} style={{ paddingTop: '2.5em' }}>
                  This is only for us and wont be published!
                </Grid.Column>
                <Grid.Column width={8}>
                  <Field
                    name='sourceId'
                    label='How did you hear about us?'
                    placeholder='Please choose'
                    component={inputFormField}
                    InputType={Form.Select}
                    options={signUpSources}
                    validate={[required]}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={16} style={{ backgroundColor: '#FFF', padding: 0 }}>
            <Grid.Row>
              <Divider/>
            </Grid.Row>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={7} style={{ backgroundColor: '#FFF' }}>
            <a href={'mailto:info@ed.ac.uk'}>Please email info@ed.ac.uk if you face any issues</a>
          </Grid.Column>
          <Grid.Column width={9} style={{ backgroundColor: '#FFF', textAlign: 'right', paddingTop: 0 }}>
            <Grid.Row>
              <Button type='submit' circular secondary>Get Started <i className='fa fa-chevron-right'></i></Button>
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

const selector = formValueSelector('UserBasicInfoForm')
UserBasicInfoForm = connect(
  state => {
    const degree = selector(state, 'degree')
    return {
      degree
    }
  }
)(UserBasicInfoForm)

export default reduxForm({
  form: 'UserBasicInfoForm'
})(UserBasicInfoForm)
