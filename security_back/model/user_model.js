const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true }, // firstname and lastname
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Email format validation
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },  password: { type: String, required: true },  //hashed password {bcrypt}
  phone:{ type: String},
  address:{ type: String},
  loginAttempt: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
  lockUntil: { type: Date },
  isVerified:{type:Boolean, default:false},
  bio: String, //bio of the user
  workDomain: String, //domain of the user sector eg: "Healthcare", "Education", "Construction & Real estate"
  isAdmin: { type: Boolean, default: false }, //admin true or false //yo just for testing, paxi milau hai 
  claimedCompany: [{ type: Schema.Types.ObjectId, ref: 'Company' }], //list of companies the user is employee of
  oldPasswords: [{ type: String }], // Array to store previous 3 passwords
});

const User = mongoose.model('User', userSchema);

module.exports = User;
