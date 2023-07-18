import { Container, Card, Nav,  Navbar} from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';

const AdminScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75 me-3'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>Admin Screen</h4>
          <div className='d-flex'>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur et deleniti, fugiat rem ad minima. 
              Aperiam quibusdam sint hic expedita velit illum, reiciendis nemo. Blanditiis distinctio sint obcaecati modi 
              voluptate?</p>
          </div>
        </Card>

        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-dark'>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="flex-column">
              <FaHome /><Nav.Link href="adminpage">Dashboard</Nav.Link>
              <Nav.Link href="profile">My Profile</Nav.Link>
              <Nav.Link href="">More details</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </Card>

      </Container>
    </div>
  );
};

export default AdminScreen;


