import React, { Fragment } from 'react';
import Landing from '../components/landing/Landing';
import { Helmet } from 'react-helmet-async';

const Home = () => {

  return (
    <Fragment>
      <Helmet>
        <title>منصة المتألق التعليمية</title>
        <meta name='description' content='منصة المتألق : هى منصة تعليمية لجميع الطلاب فى المرحلة الاعدادية والثانوية. يستطيع الطالب ان يسجل فى المرحلة المناسبة له وان يختار المجموعة المناسبة وينضم اليها'  />
      </Helmet>
      <Landing />
    </Fragment>
  );
};

export default Home;
