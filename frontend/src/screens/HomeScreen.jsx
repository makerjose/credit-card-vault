import { Container, Card, Button } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import CreditCardForm from '../components/CreditCardForm';
import FormContainer from '../components/FormContainer';

const HomeScreen = () => {
  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>CREDIT CARD VAULT</h1>
          <h4>This is Normal User Screen</h4>
        </Card>
      </Container>

      <FormContainer>
        <Row>
          <CreditCardForm></CreditCardForm>
        </Row>
      </FormContainer>
    </div>
  );
};

export default HomeScreen;


