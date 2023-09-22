import React, { Fragment, useContext } from 'react';
import Header from '../components/navbar/Header';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Loading from '../components/Loading';
import { useDispatch } from 'react-redux';
import { fetchContent } from '../redux/slices/content';
import { StudentContext } from '../context/StudentContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { studentLogout } from '../redux/slices/studentLogin';

const RootLayout = () => {
  const { studentData } = useContext(StudentContext);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (studentData?.token) {
        const tokenData = atob(studentData?.token.split('.')[1]);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        if (currentTimeInSeconds >= tokenData.exp) {
          dispatch(studentLogout());
          window.location.href = "/login";
          return;
        }
      }
    };

    setLoading(false);
    checkTokenExpiration();
    dispatch(fetchContent());
  }, [dispatch, studentData?.token]);

  return (
    <div dir="auto">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Header />
          <main className="main">
            <Outlet />
          </main>
        </Fragment>
      )}
    </div>
  );
};

export default RootLayout;
