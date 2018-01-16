import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Grid, Button, Dimmer, Loader, Form, Image } from 'semantic-ui-react';
import { required } from '../../../validators';
import { dictToArray } from '../../../utils/dictTransforms';

import inputFormField from '../../../components/InputFormField';
import searchFormField from '../../../components/SearchFormField';
import fileUploadFormField from '../../../components/FileUploadFormField';

class StatusItemForm extends Component {

  submit(values) {
    let newValues = {};
    newValues['text'] = values.text;
    newValues['topicIds'] = Object.keys(values.topics).map(key => values.topics[key].id);
    newValues['attachments'] = Object.keys(values.attachments).map(key => values.attachments[key].image);
    this.props.post(this.props.type, newValues);
  }

  render() {
    const { handleSubmit } = this.props;
    const topicItems = dictToArray(this.props.topicTypes);
    return(
      <form onSubmit={handleSubmit(this.submit.bind(this))}>
        <Grid>
          <Grid.Column width={16} style={{ padding: 0, backgroundColor: '#DEDEDE' }}>
            <div className='coandco-post-form-header'>Share your status</div>
          </Grid.Column>
        </Grid>
        <Grid className='coandco-post-form-container'>
          { this.props.isPostingItem &&
            <Dimmer active inverted>
              <Loader/>
            </Dimmer>
          }
          <Grid.Column width={16}>
            <Grid.Row>
              <Grid>
                <Grid.Column width={16} style={{ padding: '1.5em 0em 0.5em 1.5em' }}>
                  <Image avatar style={{ width: '3em', height: '3em', display: 'inline-block' }} src={this.props.user.profilePhotoUrl} />
                  <div style={{ fontWeight: 600, display: 'inline-block' }}>
                    <div>{this.props.user.name}</div>
                  </div>
                </Grid.Column>
              </Grid>
            </Grid.Row>
            <Grid.Row>
              <Grid>
                <Grid.Column width={16}>
                  <Field
                    label=''
                    rows={5}
                    name='text'
                    placeholder='Write here'
                    InputType={Form.TextArea}
                    style={{ width: '100%' }}
                    component={inputFormField}
                    validate={required}
                  />
                  <FieldArray
                    name='topics'
                    label='Add a topic'
                    placholder='e.g. Health & Wellbeing'
                    component={searchFormField}
                    items={topicItems}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid.Column>
          {/* <Grid.Column width={12} textAlign='right' style={{ paddingRight: 0, paddingBottom: '2em' }}>
            <FieldArray
              name='attachments'
              component={fileUploadFormField}
            />
          </Grid.Column> */}
          <Grid.Column width={4} style={{ paddingBottom: '2em' }}>
            <Button type="submit" circular secondary style={{ padding: '0.8em 4em' }}>Post</Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'StatusItemForm'
})(StatusItemForm);
