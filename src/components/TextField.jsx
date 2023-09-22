import { useField } from 'formik';
import { Col, Form } from 'react-bootstrap';

const TextField = ({ name, label, md, xs, ...other }) => {
  const [field, meta] = useField(name);
  return (
    <Col md={md} xs={xs}>
      <Form.Group className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          {...field}
          {...other}
          isInvalid={meta.touched && meta.error}
          isValid={!meta.error && meta.touched}
        />
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </Form.Group>
    </Col>
  );
};

export default TextField;
