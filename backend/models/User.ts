import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  organization:{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'organization',
    required : true
  },
  role : {
    type : String,
    enum : ["owner","admin","member",],
    default : "member"
  }
}, {
  timestamps: true,
});
const User = mongoose.model("UserTable", userSchema);

export default User;
