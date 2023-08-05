import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { createCardDetails } from '../api/cardApi'; // Import createCardDetails API function
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const CreditCardForm = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const initialValues = {
    holdersName: '',
    cardNumber: '',
    cvv: '',
    expDate: '',
  };

  const validationSchema = Yup.object().shape({
    holdersName: Yup.string().required("Holder's Name is required"),
    cardNumber: Yup.string()
      .length(16, 'Card number must be 16 digits')
      .required('Card Number is required'),
    cvv: Yup.string().length(3, 'CVV must be 3 digits').required('CVV is required'),
    expDate: Yup.string().required('Expiration Date is required'),
  });



const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  try {
    // After successful login, get the userInfo from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Check if userInfo contains the _id
    if (userInfo && userInfo._id) {
      // Create the cardData object with the _id from userInfo
      const cardData = {
        ...values, 
        userId: userInfo._id, // Add the userId to the cardData object
      };

      // Call the createCardDetails function and pass cardData
      await createCardDetails(cardData);
      setFormSubmitted(true);
      toast.success('Credit card details submitted successfully!');
      resetForm();
    } else {
      throw new Error('User information not found. Please log in.');
    }
  } catch (error) {
    console.error('Error submitting credit card details:', error.message);
    toast.error('Error submitting credit card details');
  } finally {
    setSubmitting(false);
  }
};

	
  const handleCardNumberChange = (e, setFieldValue) => {
    const { value } = e.target;
    if (value.length <= 16) {
      setFieldValue('cardNumber', value);
    }
  };

  const handleCVVChange = (e, setFieldValue) => {
    const { value } = e.target;
    if (value.length <= 3) {
      setFieldValue('cvv', value);
    }
  };


  return (
    <Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
    >
      {/* Destructured props */}
      {({ isSubmitting, setFieldValue, values }) => (
        <Form>
          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='holdersName'>Holder's Name</BootstrapForm.Label>
            <Field type='text' id='holdersName' name='holdersName' as={BootstrapForm.Control} />
            <ErrorMessage name='holdersName' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='cardNumber'>Card Number</BootstrapForm.Label>
            <Field type='text' id='cardNumber' name='cardNumber' as={BootstrapForm.Control} onChange={(e) => handleCardNumberChange(e, setFieldValue)} maxLength={16} />
            {values.cardNumber.length === 16 && ( <div className='text-success'>Max digits reached</div> )}
            <ErrorMessage name='cardNumber' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='cvv'>CVV</BootstrapForm.Label>
            <Field type='text' id='cvv' name='cvv' as={BootstrapForm.Control} onChange={(e) => handleCVVChange(e, setFieldValue)} maxLength={3}/>
            {values.cvv.length === 3 && <div className='text-success'>Max digits reached</div>}
            <ErrorMessage name='cvv' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='expDate'>Expiration Date (MM/YY)</BootstrapForm.Label>
            <Field type='text' id='expDate' name='expDate' as={BootstrapForm.Control} />
            <ErrorMessage name='expDate' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <Button type='submit' variant='primary' className='mt-3' disabled={isSubmitting}>
            Submit
          </Button>

          {/* {isSubmitting && <div className='mt-3'>Submitting...</div>} */}
					{/* {isLoading && <Loader />} */}
					{formSubmitted && <div className='mt-3'>Form submitted successfully!</div>}
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardForm;

