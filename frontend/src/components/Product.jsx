import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded bg:primary'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='p'>Category:{product.category}</Card.Text>
        <Card.Text as='h3' style={{ marginBottom: '2px' }} > Rs. {product.price}</Card.Text>
        {product.dis !== 0 && (
          <>
            <Card.Text as='h7' class="text-decoration-line-through"> Rs. {product.aprice}</Card.Text>
            <Card.Text as='h7' > -{product.dis}%</Card.Text>
          </>
        )}


      </Card.Body>
    </Card>
  );
};

export default Product;
