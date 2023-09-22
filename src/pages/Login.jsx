import React, { useContext } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import TextField from '../components/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import { Fragment } from 'react';
import { studentLogin } from '../redux/slices/studentLogin';
import { Helmet } from 'react-helmet-async';
import { StudentContext } from '../context/StudentContext';

const Login = () => {

  const {studentData} = useContext(StudentContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.studentLogin
  );
  const initialValues = {
    code: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .required('كود الطالب مطلوب')
      .matches(/^S/, 'يجب ان يبدأ ب S ')
      .length(10, 'يجب ان يكون 10 أحرف او أرقام'),
    password: Yup.string().required('كلمة المرور مطلوبة'),
  });

  const handleSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false);
    dispatch(studentLogin(values));
  };

  useEffect(() => {
    if (studentData?.token) {
      return navigate("/")
    }
    let timer = null;
    if (message) {
      timer = setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [message, navigate, studentData]);

  return (
    <Container>
      <Helmet>
        <title>تسجيل الدخول</title>
      </Helmet>
      {error &&<AlertMessage type="error" msg={error} />}
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
              تسجيل الدخول
            </h2>
            <Row>
              <TextField label="كود الطالب" type="text" name="code" xs={12} />
              <TextField
                label="كلمة المرور"
                type="password"
                name="password"
                xs={12}
              />

              <Col>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  {loading ? (
                    <Fragment>
                      <Spinner animation="border" role="status" size="sm" />{' '}
                      &nbsp; جارى الارسال
                    </Fragment>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </Col>
              <Col className="mt-3" xs={12}>
                <p>
                  ليس لديك حساب ؟ <Link to="/register">انشاء حساب</Link>
                </p>
              </Col>

              <Col className="mt-1" xs={12}>
                <Link to="/reset-password">نسيت كلمة المرور</Link>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
