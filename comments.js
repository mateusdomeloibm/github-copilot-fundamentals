// Create web server
app.post('/comments', function (req, res) {
  var comment = req.body;
  comment.user = req.user;
  comment.date = new Date();
  comments.insert(comment, function (err, comment) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(comment);
    }
  });
});

// Path: comments.js
// Update a comment
app.put('/comments/:id', function (req, res) {
  var comment = req.body;
  delete comment._id;
  var commentId = req.params.id;
  comments.updateById(commentId, {$set: comment}, function (err) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(comment);
    }
  });
});

// Path: comments.js
// Delete a comment
app.delete('/comments/:id', function (req, res) {
  var commentId = req.params.id;
  comments.removeById(commentId, function (err) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(null);
    }
  });
});

// Path: comments.js
// Get comments by user
app.get('/users/:username/comments', function (req, res) {
  var username = req.params.username;
  comments.find({user: username}).toArray(function (err, items) {
    if (err) {
      res.send(500, err);
    } else {
      res.json(items);
    }
  });
});