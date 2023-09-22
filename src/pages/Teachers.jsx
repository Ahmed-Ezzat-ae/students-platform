import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeachers } from '../redux/slices/teachersSlice';
import { Fragment } from 'react';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';
import TeachersContent from '../components/teachers/TeacherContent';
import { Helmet } from 'react-helmet-async';


const Teachers = () => {
  const { loading, error, teachers } = useSelector((state) => state.teachers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet>
        <title>المعلمين</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : (
        <TeachersContent teachers={teachers} />
      )}
    </Fragment>
  );
};

export default Teachers;
