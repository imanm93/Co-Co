import React from 'react';
import { Input } from 'semantic-ui-react';

export default function checkboxFormField({
  input: {
    value,
    onChange,
    ...input
  },
  meta: {
    touched,
    error,
    warning
  },
  label,
  InputType=Input,
  ...props
})
{
    const hasError = touched && error !== undefined;
    return (
      <div>
        <InputType
          {...input}
          {...props}
          defaultChecked={!!value}
          type="checkbox"
          label={label}
          onChange={(e, data) => onChange(data.checked)}
        />
        { hasError && <span style={{color:'#E74C3C'}}><i>{error}</i></span> }
        { warning && <span><i>{warning}</i></span> }
      </div>
    );
  }
