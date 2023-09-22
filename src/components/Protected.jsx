import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { StudentContext } from '../context/StudentContext';

const Protected = ({ children }) => {
  const { studentData } = useContext(StudentContext);
  let token = studentData?.token;
  return token ? children : <Navigate to="/login" replace />;
};

export default Protected;
