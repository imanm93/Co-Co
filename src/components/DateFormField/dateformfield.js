import React from 'react';
import moment from 'moment';
import styles from './dateformfield.css';
import DatePicker from 'react-datepicker';

export default function dateFormField({
  input,
  type,
  dateFormat,
  datePickerClass,
  showTimeSelect,
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
  console.log(input.value);
  return (
    <div className='coandco-input-field'>
      <div className='coandco-input-label'>{label}</div>
      <div className={datePickerClass}>
        {showTimeSelect &&
          <DatePicker {...input} dateFormat={dateFormat} selected={input.value ? moment(input.value, dateFormat) : null} showTimeSelect />
        }
        {!showTimeSelect &&
          <DatePicker {...input} dateFormat={dateFormat} selected={input.value ? moment(input.value, dateFormat) : null} />
        }
        {hasError && <span style={{ color: '#E74C3C' }}><i>{error}</i></span>}
      </div>
    </div>
  );
}
