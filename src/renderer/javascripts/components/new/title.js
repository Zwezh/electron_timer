import React from 'react';

export const Title = ({title, onChange}) => {
  return (
    <div className="new-entry__details">
      <textarea
        className="new-entry__field"
        value=""
        cols=""
        rows="1"
        value={title}
        placeholder="Start new activity"
        onChange={(event) => onChange(event.target.value)}
      ></textarea>
    </div>
  );
};
