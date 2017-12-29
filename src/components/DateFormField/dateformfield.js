import React from 'react';
import moment from 'moment';
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
    <div>
        <div>{label}</div>
        <DatePicker {...input} dateForm={dateFormat} selected={input.value ? moment(input.value) : null} />
        { hasError && <span style={{color:'#E74C3C'}}><i>{error}</i></span> }
    </div>
  );
}
