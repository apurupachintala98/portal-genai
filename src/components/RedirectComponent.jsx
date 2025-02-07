import React from 'react';

const RedirectComponent = ({ src }) => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe src={src} title="External Content" style={{ width: '100%', height: '100%', border: 'none' }} />
    </div>
  );
};

export default RedirectComponent;
