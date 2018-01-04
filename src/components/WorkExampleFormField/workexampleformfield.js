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
              return <Grid.Row key={index}>
                      <Grid.Column width={5}>
                        <Field
                          name={`${sample}.mediaUrl`}
                          component={WorkSampleMedia}
                          componentId={`background-profile-picture-${index}`}
                          mediaUrl={`${sample}.mediaUrl`}
                        />
                      </Grid.Column>
                      <Grid.Column width={11}>
                        <p>What is this project called?</p>
                        <Field
                          InputType={Form.Input}
                          placeholder="the project name"
                          component={inputFormField}
                          name={`${sample}.title`}
                          validate={required}
                        />
                        <p>Give a brief description</p>
                        <Field
                          rows={8}
                          autoHeight
                          validate={required}
                          InputType={Form.TextArea}
                          component={inputFormField}
                          name={`${sample}.description`}
                          placeholder="Describe your project, such as the materials used, or the idea behind it"
                        />
                        <p>Project URL</p>
                        <Field
                          validate={url}
                          InputType={Form.Input}
                          component={inputFormField}
                          name={`${sample}.projectUrl`}
                          placeholder="Add an URL for more info"
                        />
                      </Grid.Column>
                      <Button color="red" style={{ marginTop: "30px" }} fluid onClick={() => this.removeWorkExample(index)}>
                        Remove work example
                      </Button>
                    </Grid.Row>
              })
            }
            <div>
            { fields.length <= 2 &&
              <Button type="button" circular secondary onClick={() => fields.push({})}>
                <Icon name="plus" />Add another example
              </Button>
            }
            </div>
        </Grid>
      )
    }
  }

  export default WorkExampleFormField;
