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
  ...custom
}) {
  const hasError = touched && error !== undefined;
  return(
    <div>
      <Input
        error={hasError}
        type={type}
        placholder={placholder}
        {...input}
        {...custom}
      />
      { hasError && <span style={{color:'#E74C3C'}}><i>{error}</i></span> }
      { warning && <span><i>{warning}</i></span> }
    </div>
  );
}
