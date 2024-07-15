import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeWishItem } from '../slices/wishSlice';
import { useNavigate } from 'react-router-dom';
const WishList = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlists);
  const removeFromWishHandler = (id) => {
    dispatch(removeWishItem(id));
  };
  const navigate = useNavigate();
  return (
    <Col>
      <h1 style={{ marginBottom: '20px' }}>My Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <Message>
          Your Wish list is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {wishlistItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </Col>
                <Col md={2}>Rs. {item.price}</Col>

                <Col md={1} >
                  <Button
                    type='button'
                    variant='primary'
                    onClick={() => navigate(`/product/${item._id}`)}
                  >
                    Process
                  </Button>
                </Col>
                <Col md={1} >


                  <Button
                    type='button'
                    style={{ backgroundColor: '#ff435d' }}

                    variant='light'
                    onClick={() => removeFromWishHandler(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default WishList;
