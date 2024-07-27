import React, { useEffect , useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const Buy = useSelector((state) => state.buy);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems  ,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod ,
        itemsPrice: cart.itemsPrice ,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice ,
        totalPrice: cart.totalPrice ,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
  const placeBuyOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems:  Buy.cartItems ,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod ,
        itemsPrice:Buy.itemsPrice,
        shippingPrice:   Buy.shippingPrice,
        taxPrice:  Buy.taxPrice,
        totalPrice:  Buy.totalPrice,
      }).unwrap();
      // dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };
const [action, setAction] = useState();
   useEffect(() => {

    const get = localStorage.getItem('Action')
    console.log(get)
    setAction(get);
  }, []);
  
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      {action === "true"  ? (
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {Buy.cartItems.length === 0 ? (
                <Message>empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {Buy.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          {/* <Link to={`/product/${item.product}`}> */}
                            {item.name}
                          {/* </Link> */}
                        </Col>
                        <Col md={4}>
                          {item.qty} x Rs.{item.price} = Rs.{(item.qty * (item.price * 100)) / 100}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>


        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2 style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{Buy.itemsPrice}</Col>
                 
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{Buy.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{Buy.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{Buy.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && (
                  <Message variant='danger'>{error.data.message}</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '10px',
                }}>
                  <Button
                    type='button'
                    className='btn-block'
                    disabled={Buy.cartItems === 0}
                    onClick={placeBuyOrderHandler}
                  >
                    Place Order
                  </Button>
                </div>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
) : (
  <Row>
  <Col md={8}>
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <h2>Shipping1</h2>
        <p>
          <strong>Address: </strong>
          {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
          {cart.shippingAddress.postalCode},{' '}
          {cart.shippingAddress.country}
        </p>
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Payment Method</h2>
        <strong>Method: </strong>
        {cart.paymentMethod}
      </ListGroup.Item>

      <ListGroup.Item>
        <h2>Order Items</h2>
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <ListGroup variant='flush'>
            {cart.cartItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={4}>
                    {item.qty} x Rs.{item.price} = Rs.{(item.qty * (item.price * 100)) / 100}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </ListGroup.Item>
    </ListGroup>
  </Col>


  <Col md={4}>
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items</Col>
            <Col>Rs.{cart.itemsPrice}</Col>
           
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Shipping</Col>
            <Col>Rs.{cart.shippingPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tax</Col>
            <Col>Rs.{cart.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Total</Col>
            <Col>Rs.{cart.totalPrice}</Col>
            {/* <Col>Rs.{Buy.totalPrice}</Col> */}
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          {error && (
            <Message variant='danger'>{error.data.message}</Message>
          )}
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '10px',
          }}>
            <Button
              type='button'
              className='btn-block'
              disabled={cart.cartItems === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </Button>
          </div>
          {isLoading && <Loader />}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </Col>
</Row>
)}
    </>
  );
};

export default PlaceOrderScreen;