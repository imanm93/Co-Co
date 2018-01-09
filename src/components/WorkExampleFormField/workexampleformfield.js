import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import inputFormField from '../InputFormField';
import { reduxForm, Field, formValueSelector, FieldArray, arrayRemove, change } from 'redux-form';
import { Icon, Container, Form, Grid, TextArea, Button, Label, Input, Divider } from 'semantic-ui-react';
import { required, url } from '../../validators';

import WorkSampleMedia from './worksamplemedia';

class WorkExampleFormField extends Component {

    render() {
      const { fields } = this.props;
      return (
        <Grid>
          { fields.map((sample, index, field) => {
              return <Grid.Row key={index} textAlign='left'>
                <Grid.Column width={5}>
                  <Field
                    name={`${sample}.mediaUrl`}
                    component={WorkSampleMedia}
                    componentId={`background-profile-picture-${index}`}
                    mediaUrl={`${sample}.mediaUrl`}
                  />
                </Grid.Column>
                <Grid.Column width={11}>
                  <Field
                    InputType={Form.Input}
                    placeholder="the project name"
                    component={inputFormField}
                    label='What is your project called?'
                    name={`${sample}.title`}
                    validate={required}
                  />
                  <Field
                    rows={8}
                    autoHeight
                    validate={required}
                    InputType={Form.TextArea}
                    component={inputFormField}
                    label='Give a brief description'
                    name={`${sample}.description`}
                    placeholder="Describe your project, such as the materials used, or the idea behind it"
                  />
                  <Field
                    validate={url}
                    InputType={Form.Input}
                    component={inputFormField}
                    name={`${sample}.projectUrl`}
                    label='Project Url'
                    placeholder="Add an URL for more info"
                  />
                </Grid.Column>
                <Grid.Column width={16} textAlign='center' style={{ padding: '2em', paddingBottom: 0 }}>
                  <Button circular secondary onClick={() => this.removeWorkExample(index)}>
                    Remove work example
                  </Button>
                </Grid.Column>
              </Grid.Row>
            })
          }
          { fields.length > 0 &&
            <Divider />
          }
          <Grid.Row centered>
            { fields.length <= 2 &&
              <Button type="button" circular secondary onClick={() => fields.push({})}>
                <Icon name="plus" />Add another example
              </Button>
            }
          </Grid.Row>
        </Grid>
      )
    }
  }

  export default WorkExampleFormField;
