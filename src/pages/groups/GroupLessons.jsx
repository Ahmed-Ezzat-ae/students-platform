import React, { useMemo } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/lazy';
import { downloadEContent } from '../../redux/slices/groupContent';
import AlertMessage from '../../components/AlertMessage';
import { FaDownload } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { domain } from '../../utils/domain';

const GroupLessons = () => {
  const { groupContent } = useSelector((state) => state.eContentSlice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const studyContent = useMemo(() => {
    return groupContent.find((lesson) => lesson._id === id);
  }, [groupContent, id]);

  const handleFileDownload = (filename) => {
    dispatch(
      downloadEContent({
        groupId: groupContent[0]?.groupId,
        teacherId: groupContent[0]?.teacherOwner,
        filename,
      })
    );
  };

  return (
    <Container>
      <Helmet>
        <title>المحتوى الالكترونى</title>
      </Helmet>
      <h2 className='my-4 text-primary fs-3 fw-semibold'>{studyContent?.lessonName}</h2>
      {studyContent?.videos.length ? (
        studyContent?.videos.map((v) => (
          <div key={v}>
            <ReactPlayer
              controls
              autoPlay
              width="50%"
              url={`${domain}${studyContent?.teacherOwner}/videos/${v}`}
            />
          </div>
        ))
      ) : (
     
          <AlertMessage type="error" msg="لم يتم رفع اى فيديوهات حتى الان" />

      )}

      <ListGroup>
        {studyContent?.pdfs.length ? (
          studyContent?.pdfs.map((pdf) => (
            <ListGroup.Item key={pdf} className="my-4 p-3 shadow-sm ">
              <p>{pdf}</p>
              <Button
                onClick={() => handleFileDownload(pdf)}
                size="sm"
                variant="outline-primary"
                style={{ width: '120px' }}
              >
                تنزيل &nbsp; <FaDownload />
              </Button>
            </ListGroup.Item>
          ))
        ) : (
       
            <AlertMessage type="error" msg="لم يتم رفع اى ملفات حتى الان" />
      
        )}
      </ListGroup>
    </Container>
  );
};

export default GroupLessons;
