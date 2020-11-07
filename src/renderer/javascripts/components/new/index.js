import React, { useState, useEffect } from 'react';
import { Title } from './title';
import { Actions } from './actions';

export const New = ({ time:defaultTime, title:defaultTitle }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [time, setTime] = useState(defaultTime);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    window.subscribeForTimer((_, data) => {
      setTime(data.time);
      setTitle(data.title);
      setRunning(true);
    });
  }, []);

  const handleStartTimer = () => {
    setRunning(true);
    window.startTimer(title);
  };
  const handleStopTimer = () => {
    setRunning(false);
    setTime(0);
    setTitle('');
    window.stopTimer();
  };

  return (
    <div className="new-entry">
      <Title title={title} onChange={(value) => setTitle(value)} />
      <Actions
        duration={time}
        running={running}
        disabled={title === ''}
        onStartTimer={handleStartTimer}
        onStopTimer={handleStopTimer}
      />
    </div>
  );
};
