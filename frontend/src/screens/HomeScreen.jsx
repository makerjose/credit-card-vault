import { Container, Card, Navbar, Nav, Row } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';
import CreditCardForm from '../components/CreditCardForm';
import FormContainer from '../components/FormContainer';

const HomeScreen = () => {
  return (
    <div className=' py-3'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 me-3'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>Enter your credit card details</h4>

          <FormContainer>
            <Row>
              <CreditCardForm></CreditCardForm>
            </Row>
          </FormContainer>
        </Card>

      <Card className='p-5 d-flex flex-column align-items-center hero-card bg-dark'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="flex-column">
              <FaHome /><Nav.Link href="/">Dashboard</Nav.Link>
              <Nav.Link href="updateCardDetails">Update Card Details</Nav.Link>
              <Nav.Link href="profile">My profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </Card>
      </Container>

    </div>
  );
};

export default HomeScreen;


