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

module.exports = commentRoutes;
