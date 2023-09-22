import { Button, Container, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { studentLogout } from '../../redux/slices/studentLogin';
import { domain } from '../../utils/domain';

const Header = () => {
  const { studentData } = useSelector((state) => state.studentLogin);
  const { content } = useSelector((state) => state.contentSlice);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(studentLogout());
    window.location.href = '/login';
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" dir="rtl">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {content?.logoImg ? (
            <img
              src={`${domain}/images/logo/${content.logoImg}`}
              alt="logo"
              className="logo-img"
            />
          ) : (
            'المتألق'
          )}
        </Navbar.Brand>

        {Object.keys(studentData)?.length ? (
          <Stack direction="horizontal" gap={3}>
            <span className="h5 mb-0">{studentData?.name}</span>
            {studentData?.profile ? (
              <Link to="/profile">
                <img
                  src={
                    studentData?.profile
                      ? studentData?.profile
                      : '/images/avatars/default.png'
                  }
                  alt="profile"
                  className="header-img"
                />
              </Link>
            ) : null}
            <Button onClick={handleLogout}>خروج</Button>
          </Stack>
        ) : (
          <Button as={Link} to="login">
            تسجيل الدخول
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
