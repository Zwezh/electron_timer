import React from 'react';
import { Entries } from './entries';
import { New } from './new';

export const App = ({ entries, time, title }) => {
  return (
    <>
      <New time={time} title={title} />
      <Entries entries={entries} />
    </>
  );
};
