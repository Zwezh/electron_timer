import React from 'react';
import PlayIcon from 'play.svg';
import StopIcon from 'stop.svg';
import classnames from 'classnames';
import { durationToTime } from 'helpers/time';

export const Actions = ({
  disabled,
  duration,
  running,
  onStartTimer,
  onStopTimer
}) => {
  const onClick = () => {
    if (disabled) return;
    running ? onStopTimer() : onStartTimer();
  };

  return (
    <div className="new-entry__actions">
      <div className="actions__time">{durationToTime(duration)}</div>
      <div
        className={classnames('actions__trigger', { disabled })}
        onClick={onClick}
      >
        {running ? (
          <StopIcon width="24" height="24" />
        ) : (
          <PlayIcon width="24" height="24" />
        )}
      </div>
    </div>
  );
};
