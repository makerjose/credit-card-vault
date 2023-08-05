import React, { useState, useReducer, useEffect } from 'react';
import { Card, Button, ListGroup, Container, Row, Col } from 'react-bootstrap';
import {  Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';

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
    const [cardDetails, setCardDetails] = useState([]);
  
    useEffect(() => {
      // Fetch card details from the server
      fetchCardDetailsFromDB();
    }, []);
  
    const fetchCardDetailsFromDB = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cardDetails');
  
        // geet the current user ID from the localStorage 
        const userId = JSON.parse(localStorage.getItem('userInfo'))._id;
  
        // Filter card details based on the user ID
        const userCardDetails = response.data.find((card) => card.userId === userId); //using .find() instead of .filter()
        setCardDetails(userCardDetails); // Set the filtered data into the state
        console.log("Fetched card details: ", userCardDetails)
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    const handleCheckout = async () => {
      if (state.totalPrice === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
      }
    
      if (state.totalPrice > cardDetails.accountBal) {
        alert('Insufficient balance! Please add funds to your account or remove items from your cart.');
        return;
      }
    
      // Show a confirmation message to the user
      const confirmPurchase = window.confirm('Are you sure you want to checkout?');
    
      if (confirmPurchase) {
        try {
          // Make a PUT request to update the account balance
          const response = await axios.put(`http://localhost:5000/api/cardDetails/${cardDetails.userId}/updateBalance`, {
            userId: cardDetails.userId,
            totalPrice: state.totalPrice,
          });
    
          // Update the account balance in the state with the new value from the server
          setCardDetails((prevCardDetails) => ({
            ...prevCardDetails,
            accountBal: response.data.newBalance,
          }));
    
          // Show a success message to the user (you can use a toast or alert)
          alert('Purchase successful!');
        } catch (error) {
          console.error('Error updating account balance:', error);
          // Show an error message to the user (you can use a toast or alert)
          alert('Error updating account balance. Please try again.');
        }
      }
    };
    
  
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
            <Col>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>My Card Details</Card.Title>
                  <p>Holders Name: <strong>{cardDetails.holdersName}</strong></p>
                  <p>Card Number: <strong>{cardDetails.cardNumber}</strong></p>
                  <p>Cvv: <strong>{cardDetails.cvv}</strong></p>
                  <p><h6>Account Balance: <strong>KES. {cardDetails.accountBal}</strong></h6></p>
                </Card.Body>
              </Card>
            </Col>
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
          <Button variant="dark" className="ms-2" onClick={handleCheckout}>
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
  


