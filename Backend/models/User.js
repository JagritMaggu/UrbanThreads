const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
    type:String,
    required:true,
    unique:true
},
    address:{
    type:String,
    required:true,
   
},
    phone:{
    type:String,
    required:true,
   
},

password:{
    type:String,
    required:true
},
})

  userSchema.pre("save", async function(next){
    if(!this.isModified("password"))
        return next();

    this.password = await bcrypt.hash(this.password, 7);
    next();
  });

  userSchema.methods.matchPassword = async function (pass){
    return await bcrypt.compare(pass, this.password);
  }


  const User = model("User", userSchema);

  module.exports = {User};