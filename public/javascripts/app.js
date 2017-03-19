var app = angular.module('flapperNews', ['ui.router'])

  // Config
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/views/home.html',
        controller: 'MainCtrl',
        resolve: {
          postpromise: ['posts', function(posts) {
            return posts.getAll();
          }],
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/views/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      })

    $urlRouterProvider.otherwise('/home');
  }])

  // Factory
  .factory('posts', ['$http', function($http) {
    return {
      posts: [],
      post: null,
      getAll: function() {
        var self = this;
        return $http.get('/posts').success(function(data) {
          angular.copy(data, self.posts);
        });
      },
      create: function(post) {
        var self = this;
        return $http.post('/posts', post).success(function(data) {
          self.posts.push(data);
        });
      },
      upvote: function(post) {
        var self = this;
        return $http.put('/posts/' + post._id + '/upvote').success(function(data) {
            post.upvotes += 1;
          });
      },
      get: function(id) {
        var self = this;
        return $http.get('/posts/' + id).then(
          function(res) {
            self.post = res.data;
            return res.data;
          },
          function(res) {
            console.log('Unable yo get the post');
          });
      },
      addComment: function(id, comment) {
        return $http.post('/posts/' + id + '/comments', comment);
      },
      upvoteComment: function(comment) {
        return $http.put('/posts/' + comment.post + '/comments/' + comment._id + '/upvote').success(function(data) {
            comment.upvotes += 1;
          });
      }
    };
  }])

  // Controller
  .controller('MainCtrl', ['posts', function(posts) {
    var self = this;

    self.posts = posts.posts;

    self.addPost = function() {
      if(!self.title || self.title === '') { return; }

      posts.create({
        title: self.title,
        link: self.link,
      });

      self.title = '';
      self.link = ''
    }

    self.addVote = function(post) {
      posts.upvote(post);
    }

  }])

  .controller('PostsCtrl', ['$stateParams', 'posts', function ($stateParams, posts) {
    var self = this;

    self.comments = posts.post.comments;

    self.addComment = function() {
      if(self.comment === '') { return; }
      posts.addComment(posts.post._id, {
        author: 'user',
        body: self.comment
      }).success(function(data) {
        self.comments.push(data);
      });
      self.comment = '';
    }

    self.addVote = function(comment) {
      posts.upvoteComment(comment);
    }

  }]);