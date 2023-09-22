import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SelectBox from '../components/SelectBox';
import FileBase64 from 'react-file-base64';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetRegister,
  studentRegister,
} from '../redux/slices/studentRegister';
import AlertMessage from "../components/AlertMessage";
import { Helmet } from 'react-helmet-async';
import { StudentContext } from '../context/StudentContext';

const Register = () => {
  const [profile, setProfile] = useState(null);
  const { studentData } = useContext(StudentContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(
    (state) => state.studentRegister
  );

  const initialValues = {
    name: '',
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    level: '',
    gender: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[\u0600-\u06FF\s]+$/, 'الاسم مطلوب باللفة العربية')
      .required('الاسم مطلوب'),

    phone: Yup.string()
      .matches(/^01\d{9}(,\s*01\d{9})*$/, 'هذا التنسيق غير صالح')
      .required('رقم الهاتف مطلوب'),

    code: Yup.string()
      .required('كود الطالب مطلوب')
      .matches(/^S[A-Za-z0-9]/, 'يجب ان يبدأ ب S ')
      .length(10, 'يجب ان يكون 10 أحرف او أرقام'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
    confirmPassword: Yup.string()
      .required('يجب تأكيد كلمة المرور')
      .oneOf([Yup.ref('password'), null], 'كلمة المرور يجب ان تكون مطابقة'),
    level: Yup.string().required('مرحلة الدراسة مطلوبة'),
    gender: Yup.string().required('حدد النوع'),
  });

  const levels = ['المستوى الاول', 'المستوى الثانى', 'المستوى الثالث'];

  const handleSubmit = (values, submitProps) => {
    let phones = values.phone.split(', ');
    submitProps.setSubmitting(false);
    dispatch(
      studentRegister({
        ...values,
        profile: profile ? profile : '/images/avatars/default.png',
        phone: phones,
      })
    );
    submitProps.resetForm();
  };

  useEffect(() => {
    if (studentData?.token) {
       navigate('/');
       return;
    }

    let timer = null;
    if (message) {
      timer = setTimeout(() => {
        navigate('/login');
        dispatch(resetRegister());
      }, 2500);
    }
    return () => clearTimeout(timer);
    
  }, [message, navigate, dispatch, studentData]);

  const genders = ['ذكر', 'أنثى'];

  return (
    <Container>
      <Helmet>
        <title>انشاء حساب جديد</title>
      </Helmet>
      {error && <AlertMessage type="error" msg={error} />}
      {message && <AlertMessage type="success" msg={message} />}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ isSubmitting, isValid }) => (
          <Form className="shadow-sm p-4 mt-5">
            <h2 className="text-center mb-3 text-primary fw-bold">
              انشاء حساب
            </h2>
            <Row>
              <TextField label="اسم الطالب" type="text" name="name" xs={12} />
              <TextField
                label="رقم الهاتف"
                type="text"
                name="phone"
                xs={12}
                md={6}
              />
              <TextField
                label="كود الطالب"
                type="text"
                name="code"
                xs={12}
                md={6}
              />
              <TextField
                label="كلمة المرور"
                type="password"
                name="password"
                xs={12}
                md={6}
              />
              <TextField
                label="تأكيد كلمة المرور"
                type="password"
                name="confirmPassword"
                xs={12}
                md={6}
              />

              <SelectBox
                options={levels}
                name="level"
                label="اختر المرحلة الدراسية"
                xs={12}
                md={6}
              />

              <SelectBox
                options={genders}
                name="gender"
                label="اختر النوع"
                xs={12}
                md={6}
              />

              <Col xs={12} className="mb-3">
                <FileBase64
                  multiple={false}
                  onDone={({ base64 }) => setProfile(base64)}
                />
              </Col>

              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'انشاء حساب'
                  )}
                </Button>
              </Col>
              <Col className="mt-3" xs={12}>
                <p>
                  لديك حساب ؟ <Link to="/login">تسجيل الدخول</Link>
                </p>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Register;
