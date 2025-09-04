import React from 'react';

function buttons(props) {
  return (
    <button type="submit" style={props.style}>
      {props.data}
    </button>
  );
}

export default buttons;
