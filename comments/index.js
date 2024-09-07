const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const port = 4001;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {
  // data structure
  // PostId: [{commentId, content, status}, {commentId, content, status}]
};

app.get("/posts/:id/comments", (req, res) => {
  const id = req.params.id;

  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const id = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const existingCommentsArray = commentsByPostId[id] || [];

  existingCommentsArray.push({ commentId, content, status: "pending" });

  commentsByPostId[id] = existingCommentsArray;

  await axios.post("http://event-bus-srv:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: id,
      status: "pending",
    },
  });

  console.log(commentsByPostId);

  res.status(201).send(existingCommentsArray);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received Event", type);

  if (type === "CommentModerated") {
    const { postId, id, status, content } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.commentId === id);
    comment.status = status;

    await axios.post("http://event-bus-srv:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        content,
        postId,
      },
    });
  }

  res.send({});
});

app.listen(port, () => {
  console.log("Running on port 4001");
});
