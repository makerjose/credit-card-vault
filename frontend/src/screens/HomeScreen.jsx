import { Container, Card, Button } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>This is Normal User Screen</h4>
          <p className='text-center mb-4'>
            The user provides credit card details to be stored and encrypted in the database.
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default HomeScreen;
