import asyncHandler from 'express-async-handler';
import CardDetails from '../models/cardDetailsModel.js';
import User from '../models/userModel.js';

// @desc    Create new card details for the logged-in user
// @route   POST /api/users/carddetails
// @access  Private
// const createCardDetails = asyncHandler(async (req, res) => {
//     const { holdersName, cardNumber, cvv, expDate } = req.body;
  
//     // Get the logged-in user's ID
//     const userId = req.user._id;
//     // console.log(userId);
  
//     // Create card details and set the userId field
//     const cardDetails = await CardDetails.create({
//       holdersName,
//       cardNumber,
//       cvv,
//       expDate,
//       userId: userId, // Set the userId field to the user's ID
//     });
  
//     if (cardDetails) {
//       // Associate the card details with the logged-in user
//       const user = await User.findById(userId);
//       if (user) {
//         user.cardDetails = cardDetails._id;
//         await user.save();
//       }
  
//     // Include the userId in the response
//     res.status(201).json({ ...cardDetails.toObject(), userId: userId });
//     } else {
//       res.status(400);
//       throw new Error('Invalid card details data');
//     }
//   });
  

// @desc    Create card details
// @route   POST /api/cardDetails
// @access  Public
const createCardDetails = asyncHandler(async (req, res) => {

  // Get the card data from the request body
  const { holdersName, cardNumber, cvv, expDate, userId } = req.body;

  console.log('Request Body:', req.body);

  try {
    // Create a new card details entry in the database with the user ID
    const cardDetails = await CardDetails.create({
      holdersName,
      cardNumber,
      cvv,
      expDate,
      userId,
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

// @desc    Fetch card details for the logged-in user
// @route   GET /api/users/carddetails
// @access  Private
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



export { createCardDetails, updateCardDetails, deleteCardDetails, getCardDetails };
