// create web server with express
const express = require('express');
const router = express.Router();
// import comment controller
const commentController = require('../controllers/comments');
// import auth middleware
const auth = require('../middleware/auth');

// create a comment
router.post('/', auth, commentController.createComment);
// get all comments
router.get('/', auth, commentController.getAllComments);
// get a comment by id
router.get('/:id', auth, commentController.getOneComment);
// update a comment
router.put('/:id', auth, commentController.updateComment);
// delete a comment
router.delete('/:id', auth, commentController.deleteComment);

module.exports = router;