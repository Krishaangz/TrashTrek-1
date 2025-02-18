import React from 'react';

interface AudioMessageProps {
  url: string;
}

const AudioMessage: React.FC<AudioMessageProps> = ({ url }) => {
  return (
    <audio controls className="max-w-full">
      <source src={url} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioMessage; 