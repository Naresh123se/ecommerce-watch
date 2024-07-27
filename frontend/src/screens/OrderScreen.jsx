import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../Index.css';

import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useInitiatePaymentMutation } from "../slices/khaltiSlice.js";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useCancelProductMutation,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";
import { useNavigate } from "react-router-dom";
import KhaltiButton from "../assets/KhaltiButton.png";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PaymentReceipt } from "../components/PaymentReceipt.jsx";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const currentUrl = window.location.href;
  const url = new URL(currentUrl);
  const status = url.searchParams.get("status");
  const [khalti, setKhalti] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [khaltiPay] = useInitiatePaymentMutation();
  const [isPending] = useState(false);
  const nav =useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await khaltiPay({
        amount: order.totalPrice,
        customerName: order.user.name,
        customerEmail: order.user.email,
        customerAddress: order.shippingAddress.city,
        orderId: order._id,
      }).unwrap();
      redirectToKhalti(response);
    } catch (err) {
      console.error(err);
    }
  };
  const [showPopup, setShowPopup] = useState();
  const closePopup = () => {
    console.log('Closing');
    setShowPopup(false); // Close the popup
  };
  useEffect(() => {
    async function onApproveKhalti() {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();
    }
    if (status === "Completed") {
      setKhalti(true);
      onApproveKhalti();
      setShowPopup(true);
      console.log("first")
    }
  }, [orderId, payOrder, refetch, status]);

  const redirectToKhalti = (response) => {
    if (response && response.payment_url) {
      window.location = response.payment_url;
    } else {
      console.error("Invalid response from Khalti:", response);
    }
  };

  //Cash On Delivery
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    setShowPopup(true);
    toast.success("Payment Successful!");
  }

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered!");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const [CancelOrder, { isLoading: loadingDelete }] =
  useCancelProductMutation();

  const CancelOr = async (id) => {
    if (window.confirm('Are you sure to cancel this order?')) {
      try {
        await CancelOrder(id);
        refetch();
        toast.success("Order Cancel Successfully!");
        nav('/')

      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <PaymentReceipt show={showPopup} onClose={closePopup} /> 
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {khalti ? (
                <Message variant="success">
                  {order.paidAt} Paid successfully with Khalti!
                </Message>
              ) : (
                <>
                  {order.isPaid ? (
                    <Message variant="success">
                      {order.paidAt} Cash on Delivery Pay!
                    </Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x Rs.{item.price} = Rs.{item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rs.{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rs.{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rs.{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs.{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div style={{ display: "flex", gap: "20px" }}>
                        {/* THIS BUTTON IS FOR CASH ON DELIVERY!*/}
                        <div>
                          <Button
                            onClick={onApproveTest}
                            style={{ marginBottom: "10px", backgroundColor:"#F63576"}}
                          >
                            Cash On Delivery
                          </Button>
                        </div>

                        {/* THIS BUTTON IS FOR KHALTI PAY */}
                        <div>
                          <Button
                            onClick={handleClick}
                            style={{
                              backgroundImage: `url(${KhaltiButton})`, // Use backgroundImage for the URL
                              backgroundSize: "cover",
                              width: "auto",
                              height: "auto",
                              maxWidth: "100%",
                              maxHeight: "100%",
                              border: "none",
                              color: "transparent",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Pay with a Khalti
                          </Button>
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight:'50px',
                       marginTop:'20px',
                       
                      }}>
                        <Button
                        style={{background: "red",}}
                        onClick={() =>CancelOr(order._id)}
                        >
                          Cancel Order
                        </Button>
                      </div>


                    </div>
                  )}
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;