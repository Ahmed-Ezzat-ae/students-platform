import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../components/AlertMessage';

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/login');
  }, [navigate]);
  return <AlertMessage type="error" msg="هذه الصفحة غير موجودة"  />;
};

export default NotFound;
