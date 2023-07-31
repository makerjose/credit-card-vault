import React, { useState, useReducer } from 'react';
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import {  Nav, Navbar } from 'react-bootstrap';

const shoesData = [
  { id: 1, name: 'Cap', price: 1000 },
  { id: 2, name: 'Shirt', price: 2000 },
  { id: 3, name: 'Shoes', price: 3000 },
  { id: 4, name: 'Blazer', price: 4000 },
];


const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
          totalPrice: state.totalPrice + action.payload.price,
        };
      case 'REMOVE_ITEM':
        const itemToRemoveIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
        if (itemToRemoveIndex !== -1) {
          const updatedCartItems = state.cartItems.slice();
          updatedCartItems.splice(itemToRemoveIndex, 1);
          return {
            ...state,
            cartItems: updatedCartItems,
            totalPrice: state.totalPrice - action.payload.price,
          };
        }
        return state;
      default:
        return state;
    }
  };
  
  const ShoppingCart = () => {
    const initialState = {
      cartItems: [],   // Add cartItems to the initial state
      totalPrice: 0,   // Add totalPrice to the initial state
    };
  
    const [state, dispatch] = useReducer(cartReducer, initialState);
  
    const handleAddToCart = (item) => {
      dispatch({ type: 'ADD_ITEM', payload: item });
    };
  
    const handleRemoveFromCart = (item) => {
      dispatch({ type: 'REMOVE_ITEM', payload: item });
    };
  
    return (
      <Container className='d-flex justify-content-center'>

        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 me-3'>
          <Row>
              <Card className="mb-3">
                  <Card.Body>
                      <Card.Title>Bank Balance</Card.Title>
                      <Card.Text>Price: KES. </Card.Text>
                  </Card.Body>
              </Card>
          </Row>
          <Row className="my-3">
            {shoesData.map((item) => (
              <Col key={item.id} xs={12} md={3}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: KES. {item.price}</Card.Text>
                    <Button variant="dark" onClick={() => handleAddToCart(item)}>
                      Add
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h3>Shopping Cart</h3>
          <ListGroup>
            {state.cartItems.map((item) => (  
              <ListGroup.Item key={item.id}>
                {item.name} - ${item.price}
                <Button variant="danger" className="ms-2" onClick={() => handleRemoveFromCart(item)} style={{ width: '90px', float: 'right' }}>
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4>Total Price: KES. {state.totalPrice}</h4>  
          <Button variant="dark" className="ms-2" >
              Checkout
          </Button>
        </Card>

        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-dark'>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
            <Navbar.Collapse id="navbar-nav">
              <Nav className="flex-column">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link href="shoppingcart">Shopping Cart</Nav.Link>
                <Nav.Link href="profile">My profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Card>

      </Container>
    );
  };
  
  export default ShoppingCart;
  


