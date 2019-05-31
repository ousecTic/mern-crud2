const express = require("express");

const commentRoutes = express.Router();

const Comment = require("../models/comment.model");

//routes

//get routes
commentRoutes.route("/").get((req, res) => {
  Comment.find({})
    .then(data => res.json(data))
    .catch(err => console.log(err));
});

//add routes
commentRoutes.route("/add").post((req, res) => {
  let comment = new Comment(req.body);
  comment
    .save()
    .then(data =>
      res.status(200).json({ comment: "comment is added successfully" })
    )
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

//edit route

commentRoutes.route("/edit/:id").get((req, res) => {
  let id = req.params.id;
  Comment.findById(id, (err, comment) => {
    res.json(comment);
  });
});

//update route

commentRoutes.route("/update/:id").post((req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (!comment) res.status(404).send("data is not found");
    else {
      comment.name = req.body.name;
      comment.comment = req.body.comment;
      comment
        .save()
        .then(comment => {
          res.json("update completed");
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

//delete route

commentRoutes.route("/delete/:id").get((req, res) => {
  Comment.findByIdAndRemove({ _id: req.params.id }, (err, comment) => {
    if (err) res.json(err);
    else res.json("successfully removed");
  });
});

module.exports = commentRoutes;
