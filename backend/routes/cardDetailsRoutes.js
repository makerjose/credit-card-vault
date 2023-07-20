import express from 'express';
import {
  createCardDetails,
  updateCardDetails,
  deleteCardDetails,
} from '../controllers/cardDetailsController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createCardDetails);
router.put('/:id', protect, updateCardDetails);
router.delete('/:id', protect, deleteCardDetails);

export default router;

