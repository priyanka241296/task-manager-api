const express = require("express");

const Tasks = require("../models/tasks");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  //const task = new Tasks(req.body);
  const task = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});
//GET/tasks?completed=true
//GET/tasks?limit=10&skip=20
//GET/tasks?sortBy=createdAt_asc//GET/tasks?sortBy=createdAt_desc//GET/tasks?sortBy=createdAt:asc
router.get("/tasks", auth, async (req, res) => {
  try {
    //const tasks = await Tasks.find({owner:req.user._id});//second logic
    //await req.user.populate("tasks").execPopulate();

    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          // sort: {
          //   //createdAt: 1, //-1 for desc and 1 for asc
          //   completed: -1, //-1 shows the completed task first then incompleted task
          //   // 1 shows the incompleted tasks first then completed task
          // },
          // match: {
          //   completed: false,
          // },
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    //const tasks = await Tasks.findById(_id);
    const task = await Tasks.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    res.status(400).send({ error: "Invalid Update !" });
  }
  //const task = await Tasks.findById(req.params.id);

  // const tasks = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  try {
    const task = await Tasks.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(400).send();
    }
    updates.forEach((update) => req.body[update]);
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    //const tasks = await Tasks.findByIdAndDelete(req.params.id);
    const tasks = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
