import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './style.module.css';
import { useSelector } from 'react-redux';
import { domain } from '../../utils/domain';

const Landing = () => {
  const { content } = useSelector((state) => state.contentSlice);
  return (
    <Container className="landing-content">
      <Row>
        <Col
          className={`mb-5 d-flex flex-column justify-content-center ${styles.desc}`}
          xs={12}
          md={6}
        >
          <h1>{content.title ? content.title : 'منصة المتألق'}</h1>
          <p>
            {content.desc
              ? content.desc
              : `           عتبر هذه المنصة مرجع لكل من الطلاب وأولياء الأمور والمعلمين على حد
                  سواء، حيث توفر كافة الأنظمة التعليمية والأساليب والطرق المطورة
                  الذكية عبر الإنترنت، حيث توفر عناء البحث والتواصل لتوفير المعلومات
                  والشروحات`}
          </p>
          <Button as={Link} to="/teachers" variant="outline-primary">
            ابدأ الان
          </Button>
        </Col>
        <Col xs={12} md={6} className="img mb-5 mb-sm-3">
          <img
            src={
              content.descImg
                ? `${domain}/images/content/${content.descImg}`
                : '/images/landing.jpg'
            }
            alt="landing"
            className={styles.landingImg}
            loading="lazy"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
