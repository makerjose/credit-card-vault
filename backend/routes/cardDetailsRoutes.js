
import express from 'express';
import {
  createCardDetails,
  updateCardDetails,
  deleteCardDetails,
  getCardDetails,
} from '../controllers/cardDetailsController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCardDetails); 
router.post('/', createCardDetails);
router.put('/:id', updateCardDetails);
router.delete('/:id', protect, deleteCardDetails);
router.delete('/temp/:id', deleteCardDetails);

export default router;

