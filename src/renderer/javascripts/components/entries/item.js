import React from 'react';
import { durationToTime } from 'helpers/time';

export const Item = ({ title, duration, project }) => {
  console.info(title);
  console.info(duration);
  console.info(project);
  return (
    <div className="entry-item">
      <div className="entry-item__details">
        <div className="entry-item__primary">{title}</div>
        <div className="entry-item__secondary">{project}</div>
      </div>
      <div className="entry-item__actions">
        <div className="entry-item__time">{durationToTime(duration)}</div>
      </div>
    </div>
  );
};
