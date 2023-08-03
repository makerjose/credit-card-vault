// import mongoose from 'mongoose';

// const cardDetailsSchema = mongoose.Schema(
//   {
//     holdersName: {
//       type: String,
//       required: true,
//     },
//     cardNumber: {
//       type: String,
//       required: true,
//     },
//     cvv: {
//       type: String,
//       required: true,
//     },
//     expDate: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User', // Reference to the User model
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const CardDetails = mongoose.model('CardDetails', cardDetailsSchema);

// export default CardDetails;


import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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

// Hash the cvv and cardNumber fields before saving
cardDetailsSchema.pre('save', async function (next) {
  // Hash cvv
  if (this.isModified('cvv')) {
    const salt = await bcrypt.genSalt(10);
    this.cvv = await bcrypt.hash(this.cvv, salt);
  }

  // Hash cardNumber
  if (this.isModified('cardNumber')) {
    const salt = await bcrypt.genSalt(10);
    this.cardNumber = await bcrypt.hash(this.cardNumber, salt);
  }

  next();
});

const CardDetails = mongoose.model('CardDetails', cardDetailsSchema);

export default CardDetails;

