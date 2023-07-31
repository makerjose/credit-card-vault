import React, { useState, useEffect } from 'react';
import { Container, Card, Nav, Navbar, Table, Button } from 'react-bootstrap';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminScreen = () => {
  const [cardDetails, setCardDetails] = useState([]);

  useEffect(() => {
    // Fetch card details from the server
    fetchCardDetailsFromDB();
  }, []);


  const fetchCardDetailsFromDB = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cardDetails');
      setCardDetails(response.data); // Set the fetched data into the state
    } catch (error) {
      console.error('Error fetching card details:', error);
    }
  };
  
  const handleDeleteCard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cardDetails/temp/${id}`);
      // Remove the deleted card from the state
      setCardDetails((prevCardDetails) =>
        prevCardDetails.filter((card) => card._id !== id)
      );
      toast.success('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting card details:', error);
      toast.error('Error deleting credit card details');
    }
  };

  return (
    <div className='py-3'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 me-3'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>Admin Screen</h4>
          <div className='d-flex'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Holder's Name</th>
                  <th>Expiration Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cardDetails.map((card) => (
                  <tr key={card._id}>
                    <td>{card.holdersName}</td>
                    <td>{card.expDate}</td>
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => handleDeleteCard(card._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>

        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-dark'>
          <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
            <Navbar.Collapse id='navbar-nav'>
              <Nav className='flex-column'>
                <FaHome />
                <Nav.Link href='adminpage'>Dashboard</Nav.Link>
                <Nav.Link href='profile'>My Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Card>
      </Container>
    </div>
  );
};

export default AdminScreen;


