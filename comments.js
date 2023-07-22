// create web server
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4001;

app.use(cors());

// create route handler for get request to /comments
app.get('/comments', (req, res) => {
  // send back json data
  res.json(comments);
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});

const comments = [
  {
    id: 1,
    username: 'John',
    comment: 'This is a comment!'
  },
  {
    id: 2,
    username: 'Mary',
    comment: 'This is also a comment!'
  },
  {
    id: 3,
    username: 'Steve',
    comment: 'Yet another comment!'
  }]