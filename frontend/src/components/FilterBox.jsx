import React, { useState } from 'react';
import {  Modal, Form, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FilterBox = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const submitHandler = (e) => {
    e.preventDefault();
    let query = [];
    if (category) {
      query.push(`category=${category}`);
    }
    if (minPrice) {
      query.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      query.push(`maxPrice=${maxPrice}`);
    }
    navigate(`/products?${query.join('&')}`);
    handleCloseModal(); // Close the modal after submission
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShowModal}>
      Filters
      </Button>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apply Filters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="category-filter">
              <Form.Label>Filter by Category:</Form.Label>
              <DropdownButton id='category-dropdown' title={category || 'Select Category'}>
                <Dropdown.Item onClick={() => setCategory('Men')}>Men</Dropdown.Item>
                <Dropdown.Item onClick={() => setCategory('Women')}>Women</Dropdown.Item>
              </DropdownButton>
            </Form.Group>

            <Form.Group controlId="min-price-filter">
              <Form.Label>Minimum Price:</Form.Label>
              <Form.Control
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Enter minimum price"
              />
            </Form.Group>

            <Form.Group controlId="max-price-filter">
              <Form.Label>Maximum Price:</Form.Label>
              <Form.Control
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Enter maximum price"
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3 d-block mx-auto'>
              Apply Filters
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FilterBox;
