const mongoose = require("mongoose");
//const validator = require("validator");
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: true,
//     lowercase: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     },
//   },
//   password: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 7,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error('Password cannot contain "password"');
//       }
//     },
//   },
//   age: {
//     type: Number,
//     defalut: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     },
//   },
// });
// const me = new User({
//   name: "     JONAS",
//   email: "   MIKE@GMAIL.COM",
//   password: "Phone098", //" Password123", //"    re32   ",
// });
// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error !", error);
//   });

// const Tasks = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   completed: {
//     type: Boolean,
//     defalut: false,
//   },
// });

// const task = new Tasks({
//   description: "Eat lunch",

//   //completed: false,
// })
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
