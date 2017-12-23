import React from 'react';

export default function({
  item,
  onRemove
}) {
  return(
    <div>
      {item.name}
      <button onClick={() => onRemove(item)}>X</button>
    </div>
  )
}
