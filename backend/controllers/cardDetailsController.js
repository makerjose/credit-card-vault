import asyncHandler from 'express-async-handler';
import CardDetails from '../models/cardDetailsModel.js';
import User from '../models/userModel.js';

// Create card details
const createCardDetails = asyncHandler(async (req, res) => {

  // Get the card data from the request body
  const { holdersName, cardNumber, cvv, expDate, userId, } = req.body;

  // console.log('Request Body:', req.body);

  try {
    // Create a new card details entry in the database with the user ID
    const cardDetails = await CardDetails.create({
      holdersName,
      cardNumber,
      cvv,
      expDate,
      userId,
      accountBal: 20000,
    });

    if (cardDetails) {
      res.status(201).json(cardDetails);
    } else {
      res.status(400);
      throw new Error('Invalid card details data');
    }
  } catch (error) {
    console.error('Error creating card details:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


//Update card details for the logged-in user
const updateCardDetails = asyncHandler(async (req, res) => {
    const { holdersName, cardNumber, cvv, expDate } = req.body;
    const { id } = req.params;
  
    try {
      const cardDetails = await CardDetails.findById(id);
      if (!cardDetails) {
        res.status(404);
        throw new Error('Card details not found');
      }
  
      cardDetails.holdersName = holdersName;
      cardDetails.cardNumber = cardNumber;
      cardDetails.cvv = cvv;
      cardDetails.expDate = expDate;
  
      const updatedCardDetails = await cardDetails.save();
  
      res.json(updatedCardDetails);
    } catch (error) {
      res.status(400);
      throw new Error('Invalid card details data');
    }
  });

//Delete card details for the logged-in user
const deleteCardDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Inside deleteCardDetails function');
    const cardDetails = await CardDetails.findById(id);
    if (!cardDetails) {
      res.status(404);
      throw new Error('Card details not found');
    }

    await CardDetails.deleteOne({ _id: id });

    res.json({ message: 'Card details removed' });
  } catch (error) {
    console.log('Error in deleteCardDetails:', error);
    res.status(500).json({ error: 'Server Error' }); // Return an error response
  }
});

// Function to update the account balance
const updateAccountBalance = async (req, res) => {
  const { userId, totalPrice } = req.body;

  try {
    // Find the card details for the given user ID
    const cardDetails = await CardDetails.findOne({ userId });

    if (!cardDetails) {
      res.status(404).json({ message: 'Card details not found' });
      return;
    }

    // Deduct the totalPrice from the account balance
    const updatedBalance = cardDetails.accountBal - totalPrice;

    // Update the account balance in the database
    cardDetails.accountBal = updatedBalance;
    await cardDetails.save();

    res.json({ message: 'Account balance updated successfully', newBalance: updatedBalance });
  } catch (error) {
    console.error('Error updating account balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch card details for the logged-in user
const getCardDetails = asyncHandler(async (req, res) => {
  try {
    const cardDetails = await CardDetails.find({});
    if (!cardDetails) {
      res.status(404);
      throw new Error('Card details not found');
    }

    res.json(cardDetails);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
});


export { createCardDetails, updateCardDetails, deleteCardDetails, getCardDetails, updateAccountBalance };
