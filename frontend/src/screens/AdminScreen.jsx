import { Container, Card, Button } from 'react-bootstrap';

const AdminScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>This is Admin Screen</h4>
          <div className='d-flex'>
            <p>Content here</p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default AdminScreen;


