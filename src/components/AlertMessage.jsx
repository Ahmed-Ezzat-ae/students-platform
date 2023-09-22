import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ type, msg }) => {
  if (type === 'error') {
    return (
      <div className="my-4">
        <Alert variant="danger">{msg}</Alert>
      </div>
    );
  } else {
    return (
      <div className="my-4">
        <Alert variant="success">{msg}</Alert>
      </div>
    );
  }
};

export default AlertMessage;
