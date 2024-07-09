import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link, useLocation } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useGetFilterProductQuery } from '../slices/productsApiSlice';

const FilterPage = () => {
  const { pageNumber, sort } = useParams();
  const location = useLocation();
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');

  const { data, isLoading, error } = useGetFilterProductQuery({
    category,
    maxPrice,
    sort,
    pageNumber,
  });

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    setCategory(queryParams.get('category') || '');
    setMaxPrice(queryParams.get('maxPrice') || '');
    setMinPrice(queryParams.get('minPrice') || ''); // Correctly setting minPrice
  }, [location.search]);

  return (
    <>
      {console.log(category)}

      {!category || !sort ? (
        <Link to='/' className='btn btn-light mb-4'>
          Go Back
        </Link>
      ) : null}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error || 'Something went wrong.'}
        </Message>
      ) : (
        <>
          <Meta />
          <h1  >Latests Products</h1>

          <Row>
            {data && data.products
              .filter((product) =>
                (!category || product.category === category) &&
                (!minPrice || product.price >= parseFloat(minPrice)) &&
                (!maxPrice || product.price <= parseFloat(maxPrice))
              )
              .map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
          </Row>
          {data && (
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={`${category}-${sort}`}
            />
          )}
        </>
      )}
    </>
  );
};

export default FilterPage;
