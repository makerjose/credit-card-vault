import passport from 'passport';
import express from 'express';
import {
  createCardDetails,
  updateCardDetails,
  deleteCardDetails,
  getCardDetails,
} from '../controllers/cardDetailsController.js';

const router = express.Router();

router.get('/', getCardDetails); 
// router.post('/', passport.authenticate('local', { session: false }), createCardDetails);
router.post('/', createCardDetails);
router.put('/:id', updateCardDetails);
router.delete('/temp/:id', deleteCardDetails);

export default router;
