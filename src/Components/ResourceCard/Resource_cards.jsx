import React from 'react';
import Home_buttons from '../HomeButtons/Buttons_home';
import { useNavigate } from 'react-router-dom';

function Resource_cards({ title, img, content, to }) {
  const card = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    width: '16rem',
    boxShadow: '7.15217px 7.15217px 11.6223px rgba(0, 0, 0, 0.25)',
    borderRadius: '8.0462px',
  };
  const headStyle = {
    fontFamily: 'Roboto',
    margin: '5px 0 1px 0',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '1.5rem',
    lineHeight: '25px',
    letterSpacing: ' 0.04em',
    color: '#000000',
    textAlign: 'center',
  };
  const imageStyle = {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '15px',
  };
  const textStyle = {
    textAlign: 'center',
    margin: '18px 0 18px 0',
    paddingBottom: '10px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: ' 11.6223px',
    lineHeight: '14px',
    color: '#8B8B8B',
  };

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  //navigation
  const navigate = useNavigate();

  return (
    <div className="card" style={card}>
      <div style={imageStyle}>
        <img style={{ height: '180px', width: '180px' }} src={img} />
      </div>
      <div style={headStyle}>{title}</div>
      <div style={textStyle}>{content}</div>
      <div style={buttonStyle} onClick={() => navigate(to)}>
        <Home_buttons data={'Explore'} />
      </div>
    </div>
  );
}

export default Resource_cards;
