import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { Form, Modal, Button } from 'semantic-ui-react';
import * as actions from '../../actions';
import { required } from '../../validators';

import inputFormField from '../../components/InputFormField';

class FeedbackForm extends Component {

    onClose = (e) => {
        this.props.closeFeedbackModal();
        // this.props.closeFeedbackForm();
        // this.props.dispatchActionCreator(reset('feedbackForm'));
    }

    onSubmit = (values) => {
        console.log(values);
        // dispatch(sendFeedback({
        //     userId: values.userId,
        //     text: values.text
        // }));
        // dispatch(reset("feedbackForm"));
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <Modal
              handleClose={this.onClose}
              modalOpen={this.props.feedbackModalOpen}
              header="Feedback"
              buttonName="Send"
              submit={{ form: "feedbackForm" }}
              trigger={false}
            >
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this)}>
                  <Field
                    name="text"
                    component={semanticFormField}
                    as={Form.TextArea}
                    autoHeight
                    placeholder="Message"
                    label="Please drop us some feedback, we are working hard to make this a better experience for you"
                    validate={required}
                  />
                  <Divider />
                </Form>
            </Modal>
        )
    }
}

FeedbackForm = reduxForm({
    form: "feedbackForm"
})(FeedbackForm);

function mapStateProps(state) {
    return {}
}

export default connect(mapStateProps, actions)(FeedbackForm);
