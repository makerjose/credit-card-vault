import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

// import {
//   createCardDetails, // Import the new controller function for creating card details
//   updateCardDetails,
//   deleteCardDetails,
// } from '../controllers/cardDetailsController.js'; 

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
// router.post('/carddetails', protect, createCardDetails, updateCardDetails, deleteCardDetails); 

export default router;
