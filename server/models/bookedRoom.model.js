const mongoose = require("mongoose");

const bookedRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true, 
  },
  age: {
    type: Number,
    min: 0, 
  },
  numberOfDays: {
    type: Number,
    min: 1, 
  },
  checkIn: {
    type: Date,
  },
  checkOut: {
    type: Date,
  },
  numberOfPeople: {
    type: Number,
    min: 1, 
  },
  documentNumber: {
    type: String,
    trim: true, 
  },
  documentURL: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v); // Validates a URL
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  totalAmount: {
    type: Number,
    min: 0, 
  },
  checkInAmount: {
    type: Number,
    min: 0, 
  },
  checkOutAmount: {
    type: Number,
    min: 0, 
  },
   remainAmount: {
    type: Number,
    min: 0, 
  },
  paymentMode: {
    type: String,
    enum: ["Cash", "Card", "UPI", "Net Banking"], 
  },
  roomNumber: {
    type: String,
    trim: true,
  },
  bookedAt:{
    type:Date,
    default:Date.now(),
  }
});

module.exports = mongoose.model("BookedRoom", bookedRoomSchema);
