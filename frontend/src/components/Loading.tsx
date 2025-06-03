import React from 'react';

interface LoadingProps {
  fullScreen?: boolean;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  text = 'Loading…',
}) => {
  return (
    <div
      className={` ${fullScreen ? 'min-h-screen' : ''} flex flex-col items-center justify-center bg-gray-50 `}
    >
      <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin" />
      {text && <p className="mt-4 text-gray-600 text-lg font-medium">{text}</p>}
    </div>
  );
};

export default Loading;
