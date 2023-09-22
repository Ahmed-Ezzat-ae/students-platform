import React, { useContext } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from  './style.module.css';
import { StudentContext } from '../../context/StudentContext';

const TeacherItem = ({ teacher }) => {
  const navigate = useNavigate();
  const { studentData } = useContext(StudentContext);

  const handleClick = (id) => {
    if (studentData?.token) {
      let teacherName = teacher.name.replaceAll(' ', '-');
      return navigate(`/groups?teacherName=${teacherName}`, {
        state: {
          teacherId: id,
          level: studentData.level,
          gender: studentData.gender,
        },
      });
    } else {
      return navigate('/login');
    }
  };

  return (
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card>
        <Card.Body className="pb-0 d-flex justify-content-between align-items-center flex-row-reverse">
          <Card.Img src={teacher.profile} className={styles.profileImg} />
          <Card.Title>الاستاذ / {teacher.name} </Card.Title>
        </Card.Body>
        <Card.Body>
          <Card.Text>تخصص / {teacher.material}</Card.Text>
          <Card.Text>رقم الهاتف / {teacher.phone.join(" , ")}</Card.Text>

          <Button
            variant="outline-primary"
            onClick={() => handleClick(teacher._id)}
          >
            المجموعات
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TeacherItem;
