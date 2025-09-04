import React from 'react';
import './CSS/AlertCard.css';
import { convertToDate, convertTimeToMomentsAgo } from '../../Helpers';

function AlertCard({ alert }) {
  return (
    <div className="alertCard">
      <span className="alertHeading">{alert.topic}</span>
      <span className="alertSubHeading"> Posted: {convertTimeToMomentsAgo(alert.createdAt)} </span>

      <div className="alertDesc">{alert.content}</div>

      <div className="alertCardDate"> {convertToDate(alert.date)} </div>
    </div>
  );
}

export default AlertCard;
