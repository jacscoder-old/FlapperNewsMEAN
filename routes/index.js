var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Posts');
var Comment = require('../models/Comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyFlapperNews' });
});

// return all posts
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts) {
    if(err) { return next(err); }
    res.json(posts);
  });
});

// create a new post
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post) {
    if(err) { return next(err); }

    res.json(post);
  });
});

// return an individual post
router.get('/posts/:id', function(req, res, next) {

});

// upvote a post
router.put('/posts/:id/upvote', function(req, res, next) {

});

// creat a new comment for a post
router.post('/posts/:id/comments', function(req, res, next) {

});

// upvote a comment
router.put('/posts/:id/comments/:id/upvote', function(req, res, next) {

});

module.exports = router;
