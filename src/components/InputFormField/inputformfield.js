import React from 'react';
import { Input } from 'semantic-ui-react';

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
    <div>
      <div>{label}</div>
      <br/>
      <InputType
        type={type}
        placholder={placholder}
        value={input.value}
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
