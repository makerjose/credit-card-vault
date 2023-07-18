import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';

const CreditCardForm = () => {
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

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission logic here, e.g., send data to the server
    console.log(values);
    setSubmitting(false);
  }; 

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='holdersName'>Holder's Name</BootstrapForm.Label>
            <Field type='text' id='holdersName' name='holdersName' as={BootstrapForm.Control} />
            <ErrorMessage name='holdersName' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='cardNumber'>Card Number</BootstrapForm.Label>
            <Field type='text' id='cardNumber' name='cardNumber' as={BootstrapForm.Control} />
            <ErrorMessage name='cardNumber' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='cvv'>CVV</BootstrapForm.Label>
            <Field type='text' id='cvv' name='cvv' as={BootstrapForm.Control} />
            <ErrorMessage name='cvv' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <BootstrapForm.Group className='my-2'>
            <BootstrapForm.Label htmlFor='expDate'>Expiration Date</BootstrapForm.Label>
            <Field type='date' id='expDate' name='expDate' as={BootstrapForm.Control} />
            <ErrorMessage name='expDate' component='div' className='text-danger' />
          </BootstrapForm.Group>

          <Button type='submit' variant='primary' className='mt-3' disabled={isSubmitting}>
            Submit
          </Button>

          {isSubmitting && <div className='mt-3'>Submitting...</div>}
        </Form>
      )}
    </Formik>
  );
};

export default CreditCardForm;
