
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

const secretKey = 'my-secret-key';

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
    accountBal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt the cvv and cardNumber fields before saving
cardDetailsSchema.pre('save', async function (next) {
  // Encrypt cvv
  if (this.isModified('cvv')) {
    const encryptedCvv = CryptoJS.AES.encrypt(this.cvv, secretKey).toString();
    this.cvv = encryptedCvv;
  }

  // Encrypt cardNumber
  if (this.isModified('cardNumber')) {
    const encryptedCardNumber = CryptoJS.AES.encrypt(this.cardNumber, secretKey).toString();
    this.cardNumber = encryptedCardNumber;
  }

  next();
});

// Decrypt the cvv and cardNumber fields after fetching from the database
cardDetailsSchema.post('find', async function (cardDetails) {
  cardDetails.forEach((card) => {
    // Decrypt cvv
    const decryptedCvv = CryptoJS.AES.decrypt(card.cvv, secretKey).toString(CryptoJS.enc.Utf8);
    card.cvv = decryptedCvv;

    // Decrypt cardNumber
    const decryptedCardNumber = CryptoJS.AES.decrypt(card.cardNumber, secretKey).toString(CryptoJS.enc.Utf8);
    card.cardNumber = decryptedCardNumber;
  });
});

const CardDetails = mongoose.model('CardDetails', cardDetailsSchema);

export default CardDetails;


