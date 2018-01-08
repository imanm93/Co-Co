import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

export default function({
  item,
  onRemove
}) {
  return(
    <Label as='a' style={{
      borderRadius: '69px',
      backgroundColor: 'transparent',
      border: '1px solid #2A2A2A',
      color: '#2a2a2a',
      margin: '0.5em 0.25em'
   }}>
      {item.name}
      <Icon name='delete' onClick={() => onRemove(item)} style={{
        color: 'red'
      }}/>
    </Label>
  )
}
