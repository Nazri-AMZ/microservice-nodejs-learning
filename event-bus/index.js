const bodyParser = require("body-parser");
const express = require("express");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

// To store all the events
const events = [];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const event = req.body;

  // Store all the event
  events.push(event);

  // post service
  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  // comments service
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // query service
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  // moderation service
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Server is running on port 4005");
});
