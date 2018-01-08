import React from 'react';
import moment from 'moment';
import styles from './dateformfield.css';
import DatePicker from 'react-datepicker';

export default function dateFormField({
  input,
  type,
  dateFormat,
  label,
  placholder,
  meta: {
    touched,
    error,
    warning
  },
  ...custom
}) {
  const hasError = touched && error !== undefined;
  return(
    <div className='coandco-input-field'>
        <div className='coandco-input-label'>{label}</div>
        <DatePicker {...input} dateForm={dateFormat} selected={input.value ? moment(input.value) : null} />
        { hasError && <span style={{color:'#E74C3C'}}><i>{error}</i></span> }
    </div>
  );
}
