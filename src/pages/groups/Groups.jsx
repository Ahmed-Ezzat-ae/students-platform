import React, { Fragment, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProperGroups } from '../../redux/slices/groups';
import GroupItem from '../../components/group/GroupItem';
import './style.css';
import Loading from '../../components/Loading';
import AlertMessage from '../../components/AlertMessage';
import { Helmet } from 'react-helmet-async';

const Groups = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const { loading, error, message, groups } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(getProperGroups(state));
  }, [dispatch, state]);

  return (
    <Container>
      <Helmet>
        <title>المجموعات</title>
      </Helmet>
      {loading && <Loading />}
      {message && <AlertMessage type="success" msg={message} />}

      {error ? (
  
          <AlertMessage type="error" msg={error} />
   
      ) : groups.length ? (
        <Fragment>
          <h2 className="fs-3 fw-semibold text-primary mt-4">مجموعات </h2>
          <Accordion defaultActiveKey="0" className="my-5">
            {groups.map((group) => (
              <GroupItem key={group._id} group={group} />
            ))}
          </Accordion>
        </Fragment>
      ) : null}
    </Container>
  );
};

export default Groups;
