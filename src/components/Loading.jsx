import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div style={styles}>
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default Loading;

const styles = {
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  zIndex: 99,
  background: '#ddd',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
