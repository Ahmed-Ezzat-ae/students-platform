import React from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { joinToGroup } from '../../redux/slices/groups';
// import {  leaveGroup } from '../../redux/slices/groups';
import { useEffect } from 'react';
import {Link} from "react-router-dom"

const GroupItem = ({ group }) => {
  const { message } = useSelector((state) => state.group);
  const { studentData } = useSelector((state) => state.studentLogin);
  const { groups } = useSelector((state) => state.group);

  const isJoin = groups.find((g) => g.students.includes(studentData._id));

  const dispatch = useDispatch();
  const handleClick = (obj) => {
    dispatch(joinToGroup(obj));
  };

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        window.location.reload();
      }, 2500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <Accordion.Item eventKey={group._id}>
      <Accordion.Header>{group.name}</Accordion.Header>
      <Accordion.Body>
        <p>
          <strong>اليوم : </strong> {group.day}
        </p>
        <p>
          <strong>الساعة : </strong>
          {group.time}
        </p>
        <p>
          <strong>عدد الطلاب : </strong>
          {group.studentsNumber}
        </p>

        <Stack
          direction="horizontal"
          className="justify-content-between flex-wrap"
        >
          <Button
            size="sm"
            onClick={() =>
              handleClick({
                groupId: group._id,
                teacherOwner: group.teacherOwner,
              })
            }
            disabled={
              group.studentsNumber >= group.maxStudent ||
              group?.students?.includes(studentData._id) ||
              isJoin
            }
          >
            {group.studentsNumber >= group.maxStudent
              ? 'المجموعة ممتلئة'
              : group.students.includes(studentData._id)
              ? 'تم الانضمام'
              : 'الانضمام للمجموعة'}
          </Button>

          <div className='mt-4'>
            {isJoin && group?.studentStudy.length && group?.students?.includes(studentData._id) ? (
              <Button size="sm" className="ms-3" as={Link} to={`/groups/${group._id}/content`}>
                المحتوى الالكترونى
              </Button>
            ): null}

            {/* <Button
              size="sm"
              variant="outline-danger"
              disabled={!group?.students?.includes(studentData._id)}
              onClick={() =>
                dispatch(
                  leaveGroup({
                    groupId: group._id,
                    studentId: studentData._id,
                  })
                )
              }
            >
              مغادرة المجموعة
            </Button> */}
          </div>
        </Stack>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default GroupItem;
