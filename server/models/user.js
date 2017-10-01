// User collection
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema( {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
  password: {
    type: Boolean,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  memberType: {
    type: String,
    required: true,
    enum: ['private', 'public']
  },
  dateJoined: {
    type: Date
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {User};
