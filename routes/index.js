var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Posts');
var Comment = require('../models/Comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MyFlapperNews' });
});

// router.get('/posts', function(req, res, next) {
//   Post.find(function(err, posts){
//     if(err){ return next(err); }
//     res.json(posts);
//   });
// });

module.exports = router;
