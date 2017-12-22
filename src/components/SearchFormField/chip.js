import React from 'react';

export default function({
  item,
  onClick
}) {
  return(
    <div>{item.name}<button onClick={() => onClick(item.id)}>X</button></div>
  )
}
