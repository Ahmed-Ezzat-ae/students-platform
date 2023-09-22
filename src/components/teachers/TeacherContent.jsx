import React from 'react';
import { Container, Row } from 'react-bootstrap';
import TeacherItem from './TeacherItem';

const TeacherContent = ({ teachers }) => {
  return (
    <Container>
      <Row>
        <h2 className='text-center text-primary fw-bold mb-5 my-4 fs-1'>نخبة من افضل المعلمين</h2>
        {teachers?.map((teacher) => (
          <TeacherItem teacher={teacher} key={teacher._id} />
        ))}
      </Row>
    </Container>
  );
};

export default TeacherContent;
