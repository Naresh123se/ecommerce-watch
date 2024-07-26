import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const ok = useParams();
   console.log(ok);

  // FIX: uncontrolled input - urlKeyword may be undefined
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className='d-flex mx-2' style={{position:'relative'}}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 '
        >
      </Form.Control>
   

        <span onClick={submitHandler}  style={{cursor:'pointer', position:"absolute",  right:'10px', top:'10px' }}  >

        <img src='/uploads/Search.png' width={20} height={20} alt='search' />
 
      </span>
      
      {/* <Button type='submit' variant='success' className='p-2 '>
        Search
      </Button> */}
    </Form>
  );
};

export default SearchBox;
