// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
// import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUserApi } from '../api/userApi';
// import { useNavigate } from 'react-router-dom';


const Header = () => {

  const navigate = useNavigate();
 

  const logoutHandler = async () => {
    try {
      await logoutUserApi();
      localStorage.removeItem('userInfo'); // Remove user data from local storage
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
      
            <Navbar.Brand>Credit Card Vault</Navbar.Brand>
        
          <Navbar.Toggle aria-controls='basic-navbar-navss' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  {/* <LinkContainer to='/'>
                    <Nav.Link>
                      <FaHome />  Dashboard
                    </Nav.Link>
                  </LinkContainer>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      Role: {userInfo.role}
                    </NavDropdown.Item>
                  </NavDropdown> */}

                    <Nav.Link>
                    {userInfo.name} ({userInfo.role}) 
                    </Nav.Link>

                    <Nav.Link onClick={logoutHandler}>
                      Logout
                    </Nav.Link>
                  
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;


