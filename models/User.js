const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
  },
  name: {
  	type: String,
  	default: 'WhatTheApp User',
    required: true,
  },
  image: {
  	type: String,
  	default: '',
  },
  pin: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
