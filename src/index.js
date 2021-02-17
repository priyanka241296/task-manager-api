const express = require("express");
require("./db/mongoose");

const userRouter = require("./routers/users");
const taskRouter = require("./routers/task");
const app = express();

//const port = process.env.PORT || 3000;
const port = process.env.PORT;
// app.use((req, res, next) => {
//   //console.log(req.method, req.path);
//   if (req.method === "GET") {
//     res.send("GET request are disabled");
//   } else {
//     next();
//   }
// });
// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down.Check back soon!");
// });

const multer = require("multer");
const upload = multer({
  dest: "images",
  limits: {
    fileSize: 1000000, //1meghabyte
  },
  fileFilter(req, file, cb) {
    // if (!file.originalname.endsWith(".pdf")) {
    //   return cb(new Error("Please upload a PDF"));
    // }//instead of writing this way
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error("Please upload a word document"));
    }

    cb(undefined, true);
    //cb(new Error('File must be a must'))
    //cb(undefined, true)
    //cb(undefined , false)
  },
});

// const errorMiddleware = (req, res, next) => {
//   throw new Error("From  my mddileware");
// };
// app.post(
//   "/upload",
//   upload.single("upload"),
//   (req, res) => {
//     res.send();
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// app.post("/users", async (req, res) => {
//   const user = new User(req.body);
//   try {
//     await user.save();
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
// // user
// //   .save()
// //   .then(() => {
// //     res.status(201).send(user);
// //   })
// //   .catch((e) => {
// //     res.status(400).send(e);
// //     //res.send(e);
// //   });
// //console.log(req.body);
// // res.send("Testing");

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (e) {
//     res.status(500).send();
//   }

//   // User.find({})
//   //   .then((users) => {
//   //     res.send(users);
//   //   })
//   //   .catch((e) => {
//   //     res.status(500).send();
//   //   });
// });

// app.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;
//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }
// });
// //   User.findById(_id)
// //     .then((user) => {
// //       if (!user) {
// //         return res.status(404).send();
// //       }
// //       res.send(user);
// //     })
// //     .catch((error) => {
// //       res.status(500).send(error);
// //     });
// // });
// //console.log(req.params);

// app.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password", "age"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid update!" });
//   }
//   try {
//     const users = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!users) {
//       return res.status(404).send();
//     }
//     res.send(users);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const users = await User.findByIdAndDelete(req.params.id);
//     if (!users) {
//       return res.status(404).send();
//     }
//     res.send(users);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });
// app.post("/tasks", async (req, res) => {
//   const task = new Tasks(req.body);

//   try {
//     await task.save();
//     res.status(201).send(task);
//   } catch (e) {
//     res.status(500).send(e);
//   }
//   // task
//   //   .save()
//   //   .then(() => {
//   //     res.status(201).send(task);
//   //   })
//   //   .catch((e) => {
//   //     res.status(400).send(e);
//   //   });
// });

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await Tasks.find({});
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // Tasks.find({})
//   //   .then((tasks) => {
//   //     res.send(tasks);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });
// app.get("/tasks/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const tasks = await Tasks.findById(_id);
//     if (!tasks) {
//       return res.status(404).send();
//     }
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send(e);
//   }

//   // Tasks.findById(_id)
//   //   .then((task) => {
//   //     if (!task) {
//   //       return res.status(404).send();
//   //     }
//   //     res.send(task);
//   //   })
//   //   .catch((error) => {
//   //     res.status(500).send();
//   //   });
// });

// app.patch("/tasks/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["description", "completed"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     res.status(400).send({ error: "Invalid Update !" });
//   }
//   const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   try {
//     if (!tasks) {
//       return res.status(400).send();
//     }
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// app.delete("/tasks/:id", async (req, res) => {
//   try {
//     const tasks = await Tasks.findByIdAndDelete(req.params.id);
//     if (!tasks) {
//       return res.status(404).send();
//     }
//     res.send(tasks);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
// const bcrypt = require("bcryptjs");
// const myFunction = async () => {
//   const password = "Red12345!";
//   const hashedPassword = await bcrypt.hash(password, 8);
//   console.log(password);
//   console.log(hashedPassword);
//   const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
//   console.log(isMatch);
// };

// myFunction();

// const jwt = require("jsonwebtoken");
// const Task = require("./models/tasks");
// const User = require("./models/user");
// const myFunction = async () => {
//   const tokens = jwt.sign({ _id: "abc123" }, "thisismynewcourse", {
//     expiresIn: "7 days",
//   });
//   console.log(tokens);
//   const data = jwt.verify(tokens, "thisismynewcourse");
//   console.log(data);
// };
// myFunction();

// const pet = {
//   name: "Hal",
// };

// pet.toJSON = function () {
//   console.log(this);
//   return this;
// };

// console.log(JSON.stringify(pet));

// const main = async () => {
//   // const task = await Task.findById("6025331de20a6824d4097c18");
//   // await task.populate("owner").execPopulate();
//   // console.log(task.owner);

//   const user = await User.findById("60252fc090687825d8cd287a");
//   await user.populate("tasks").execPopulate();
//   console.log(user.tasks);
// };
// main();
