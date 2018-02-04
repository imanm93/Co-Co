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
        {...input}
        value={ input.value ? input.value : custom.initialvalue }
        onChange={ (param, data) => { input.onChange(data.value) }}
        onKeyPress={ (e) => {
          if (custom.dontPreventDefault) { /*Do Nothing*/ }
          else if (e.key == 'Enter' && InputType === Input) e.preventDefault();
        }}
        {...custom}
      />
      { hasError &&
          <span style={{ color:'#E74C3C', fontSize: '1.3em' }}>
            <i>{error}</i>
          </span>
      }
      { warning &&
          <span>
            <i>{warning}</i>
          </span>
      }
    </div>
  );

}
