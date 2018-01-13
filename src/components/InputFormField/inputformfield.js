import React from 'react';
import { Input } from 'semantic-ui-react';
import styles from './inputformfield.css';

export default function inputFormField({
  input,
  type,
  label,
  placholder,
  meta: {
    touched,
    error,
    warning
  },
  InputType=Input,
  ...custom
}) {
  const hasError = touched && error !== undefined;
  return(
    <div className='coandco-input-field'>
      <div className='coandco-input-label'>{label}</div>
      <InputType
        type={type}
        placholder={placholder}
        value={input.value ? input.value : custom.initialvalue}
        {...input}
        onChange={(param, data) => {
          input.onChange(data.value)
        }}
        {...custom}
      />
      { hasError && <span style={{color:'#E74C3C'}}><i>{error}</i></span> }
      { warning && <span><i>{warning}</i></span> }
    </div>
  );

}
