import React, { useEffect } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { groupEContent } from '../../redux/slices/groupContent';
import Loading from '../../components/Loading';
import AlertMessage from '../../components/AlertMessage';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const GroupContent = () => {
  const dispatch = useDispatch();
  const { id: groupId } = useParams();
  const { loading, error, groupContent } = useSelector(
    (state) => state.eContentSlice
  );

  useEffect(() => {
    dispatch(groupEContent(groupId));
  }, [dispatch, groupId]);

  return (
    <Container>
      <Helmet>
        <title>الدروس المتاحة</title>
      </Helmet>
      {loading ? (
        <Loading />
      ) : error ? (
        <AlertMessage type="error" msg={error} />
      ) : (
        groupContent?.length ? (
          <ListGroup className='my-4'>
            {groupContent?.map((c) => (
              <ListGroup.Item
                key={c._id}
                as={Link}
                to={`/groups/${groupId}/content/${c._id}`}
              >
                {c.lessonName}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : <AlertMessage type="error" msg="لا يوجد محتوى الكترونى تم اضافتة حتى الان"  />
      )}
    </Container>
  );
};

export default GroupContent;
