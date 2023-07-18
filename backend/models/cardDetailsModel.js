import mongoose from 'mongoose';

const cardDetailsSchema = mongoose.Schema(
  {
    holdersName: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
    },
    expDate: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CardDetails = mongoose.model('CardDetails', cardDetailsSchema);

export default CardDetails;
