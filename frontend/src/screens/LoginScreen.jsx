import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: "20px",
      marginTop:"50px"
    }}  >
      <Col md={4}  >
        <Card >
          <Form onSubmit={submitHandler} style={{ padding: "20px" }}  >
            <h1 style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Sign In</h1>
            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

            }}>

              <Button disabled={isLoading} type='submit' variant='primary' style={{}}  >
                Sign In
              </Button>
            </div>

            {isLoading && <Loader />}


            <Row className='py-3  ' >
              <Col style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

              }}>

                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Register
                </Link>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
    </div>
  );
};

export default LoginScreen;
