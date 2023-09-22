import React, { useEffect, useState } from 'react';
import { studentProfile, updateProfile } from '../../redux/slices/profile';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Loading from '../../components/Loading';
import AlertMessage from '../../components/AlertMessage';
import styles from './style.module.css';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../../components/TextField';
import FileBase64 from 'react-file-base64';

const Profile = () => {
  const { loading, error, profile, message } = useSelector(
    (state) => state.profile
  );
  const [update, setUpdate] = useState('');
  const [imgProfile, setImgProfile] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    let timer;
    if (message || error) {
      timer = setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
    dispatch(studentProfile());

    return () => clearTimeout(timer);
  }, [dispatch, message, error]);

  const initialValues = {
    name: profile?.name || '',
    phone: profile?.phone.join(', '),
    oldPassword: '',
    newPassword: '',
    code: profile?.code || '',
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
      oldPassword: Yup.string().required("كلمة المرور مطلوبة")
  });

  const handleSubmit = (values) => {
    let phones = values.phone.split(', ');
    dispatch(
      updateProfile({
        ...values,
        phone: phones,
        profile: imgProfile || profile?.profile,
      })
    );
  };

  return (
    <Container>
      <Helmet>
        <title>البروفايل</title>
      </Helmet>
      {message && <AlertMessage type="success" msg={message} />}
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : (
        <div className="p-3 shadow-sm">
          <h2 className="text-primary fw-bold text-center mb-5">
            {profile?.name}
          </h2>
          <Row>
            <Col xs={12} md={6}>
              <img
                src={profile?.profile}
                alt="profile"
                className={styles.imgProfile}
              />

              <div>
                <strong className="mb-3 d-inline-block">رقم الهاتف : </strong>
                {profile?.phone?.map((p) => (
                  <p className="lead" key={p}>
                    {p}
                  </p>
                ))}
              </div>

              <p className="lead">
                <strong>الكود : </strong>
                {profile?.code}
              </p>

              <Button
                onClick={() => setUpdate((prev) => !prev)}
                variant="outline-primary"
              >
                {update ? 'الغاء' : 'تحديث البيانات'}
              </Button>
            </Col>

            {update && (
              <Col xs={12} md={6}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isValid, dirty }) => (
                    <Form>
                      <TextField name="name" label="الاسم" />
                      <TextField name="phone" label="رقم الهاتف" />

                      <TextField name="code" label="الكود" />
                      <TextField
                        name="oldPassword"
                        type="password"
                        label="كلمة المرور القديمة"
                      />
                      <TextField
                        name="newPassword"
                        type="password"
                        label="كلمة المرور الجديدة"
                      />

                      <Col xs={12} className="mb-3">
                        <FileBase64
                          multiple={false}
                          onDone={({ base64 }) => setImgProfile(base64)}
                        />
                      </Col>

                      <Button type="submit" disabled={!(dirty && isValid)}>
                        تحديث البيانات
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            )}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Profile;
