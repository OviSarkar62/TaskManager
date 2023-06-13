const mongoose = require("mongoose");
const Joi = require("joi");
const zxcvbn = require("zxcvbn");

// Define a schema for user input validation
const userjoiSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/)
    .min(8)
    .max(128)
    .required(),
  createdAt: Joi.date().default(Date.now), 
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    minlength: [2, "Your first name must be at least 2 characters"],
    maxlength: [50, "Your first name cannot exceed 50 characters"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    minlength: [2, "Your last name must be at least 2 characters"],
    maxlength: [50, "Your last name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide the email field"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: [
      {
        validator: function (value) {
          const passwordStrength = zxcvbn(value).score;
          return passwordStrength >= 3; // Require a minimum strength of 3 out of 4
        },
        message: 'Password is too weak',
      },
      {
        validator: function (value) {
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value);
        },
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add the Joi validation to the Mongoose schema
userSchema.statics.validateUser = async function (user) {
  return userjoiSchema.validateAsync(user);
};

const users = mongoose.model("users", userSchema);
module.exports = users;