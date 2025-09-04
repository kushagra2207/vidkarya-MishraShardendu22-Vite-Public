import React from 'react';
import { BsArrowRight } from 'react-icons/bs';

function Home_buttons(props) {
  const buttonStyle = {
    backgroundColor: '#FF6E0F',
    color: '#FFFFFF',
    display: 'flex',
    width: '8rem',
    justifyContent: 'center',
    fontSize: '1rem',
    verticalAlign: 'middle',
    borderRadius: '0.375rem',
    height: '1.6rem',
  };

  return (
    <button type="submit" style={buttonStyle}>
      <div>{props.data}</div>
      <div>
        <BsArrowRight style={{ marginTop: '6px', marginLeft: '10px' }} />
      </div>
    </button>
  );
}

export default Home_buttons;
