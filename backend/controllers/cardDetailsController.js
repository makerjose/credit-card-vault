import asyncHandler from 'express-async-handler';
import CardDetails from '../models/cardDetailsModel.js';
import User from '../models/userModel.js';

// @desc    Create new card details for the logged-in user
// @route   POST /api/users/carddetails
// @access  Private
const createCardDetails = asyncHandler(async (req, res) => {
    const { holdersName, cardNumber, cvv, expDate } = req.body;
  
    // Get the logged-in user's ID
    const userId = req.user._id;
    // console.log(userId);
  
    // Create card details and set the userId field
    const cardDetails = await CardDetails.create({
      holdersName,
      cardNumber,
      cvv,
      expDate,
      userId: userId, // Set the userId field to the user's ID
    });
  
    if (cardDetails) {
      // Associate the card details with the logged-in user
      const user = await User.findById(userId);
      if (user) {
        user.cardDetails = cardDetails._id;
        await user.save();
      }
  
      res.status(201).json(cardDetails);
    } else {
      res.status(400);
      throw new Error('Invalid card details data');
    }
  });
  

// @desc    Update card details for the logged-in user
// @route   PUT /api/users/carddetails/:id
// @access  Private
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

// @desc    Delete card details for the logged-in user
// @route   DELETE /api/users/carddetails/:id
// @access  Private
const deleteCardDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const cardDetails = await CardDetails.findById(id);
      if (!cardDetails) {
        res.status(404);
        throw new Error('Card details not found');
      }
  
      await cardDetails.remove();
  
      res.json({ message: 'Card details removed' });
    } catch (error) {
      res.status(500);
      throw new Error('Server Error');
    }
  });


export { createCardDetails, updateCardDetails, deleteCardDetails };
