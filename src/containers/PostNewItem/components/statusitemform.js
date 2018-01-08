import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Grid, Button, Dimmer, Loader } from 'semantic-ui-react';
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
            <Field
              name='text'
              label=''
              placeholder='Write here'
              component={inputFormField}
              validate={required}
            />
            <hr/>
            <FieldArray
              name='topics'
              component={searchFormField}
              items={topicItems}
            />
          </Grid.Column>
          <hr className='coandco-form-section-line' />
          <Grid.Column width={13} textAlign='right'>
          <FieldArray
            name='attachments'
            component={fileUploadFormField}
          />
          </Grid.Column>
          <Grid.Column width={3}>
            <Button type="submit" circular secondary>Post</Button>
          </Grid.Column>
        </Grid>
      </form>
    )
  }

}

export default reduxForm({
  form: 'StatusItemForm'
})(StatusItemForm);
