import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { Store } from '../Store';
import axios from 'axios';

export default function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const addToCartHandler = async (item) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    console.log({ quantity });
  };
  return (
    <Card key={product.slug} className="productsList">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} />{' '}
      </Link>{' '}
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title> {product.name} </Card.Title>{' '}
        </Link>{' '}
      </Card.Body>{' '}
      <Rating rating={product.rating} numReviews={product.numReviews} />{' '}
      <Card.Text>
        <div>
          <strong> $ {product.price} </strong>{' '}
        </div>{' '}
        {product.countInStock === 0 && (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        )}
        {product.countInStock !== 0 && (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            Add to cart{' '}
          </Button>
        )}
      </Card.Text>{' '}
    </Card>
  );
}
