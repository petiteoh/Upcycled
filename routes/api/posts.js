const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require("passport");
const Post = require("../../models/Post");
const User = require("../../models/User");
const Category = require('../../models/Category');
const Upcycle = require('../../models/Upcycle');

router.get('/', (req, res) => {
    Post.find()
        .sort({ timeCreated: -1 })
        .then(posts => res.json(posts))
        .catch(err => {
            res.status(404).json({ nopostsfound: 'No posts found' })});
});

router.get('/user/:creator_id', (req, res) => {
    Post.find({ creator_id: req.params.creator_id })
        .sort({ timeCreated: -1 })
        .then(posts => res.json(posts))
        .catch(err =>
            res.status(404).json({ nopostsfound: 'This user has not posted anything yet.' }
            )
        );
});

router.get("/top-post", (req, res) => {
  Post.find()
    .sort({ upcycle_amount: -1 })
    .limit(1)
    .then((post) => res.json(post))
    .catch((err) => {
      res.status(404).json({ nopostfound: "No top post found" });
    });
});  


router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ nopostfound: 'No post found with that ID' })
        );
});

router.patch('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      image: req.body.image
      }
  }).then(post => {
    res.json({ post });
  }).catch(err =>
    res.status(404).json({ noteditable: "Post cannot be edited"}))
});

router.delete('/:id', (req, res) => {
  let postbeforeDelete = Post.findById(req.params.id)
  User.findByIdAndUpdate(postbeforeDelete.creator_id, {
    $inc: { hero_points: -5 }
  })
  Post.findByIdAndRemove(req.params.id)
  .then(post => {
    if (!post) {
      return res.status(404).send({
        message: `Post with id ${req.params.id} not found`
      });
    }
    return res.json(post);
    })
  }
);

router.post('/create-post',
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        const newPost = new Post(req.body);
        newPost
          .save()
          .then((post) => {
            User.findByIdAndUpdate(req.body.creator_id, {
              $push: {posts: newPost._id},
              $inc: { hero_points: 5 }
            }).then((user) => {
              user.save();
            });
            
            return res.json({
              post,
              user: User.findById(post.creator_id)
            });
        })
        .catch((err) =>
        res.status(404).json({ nopostfound: "Post cannot be saved, please submit all fields" })
        );
        
        // User.findByIdAndUpdate(req.body.creator_id, {
        //   $push: {posts: newPost._id},
        //   $inc: { hero_points: 5 }
        // }).then((user) => {
        //   user.save();
        // });
    }
);

router.get("/:id/upcycles", (req, res) => {
    Upcycle.find({post_id: req.params.id})
        .sort({date: -1})
        .then(upcycles => res.json(upcycles))
        .catch(err => res.status(404).json({ nopostUpcycles: "There are no upcycles for this post"}))
});

router.post("/:id/create-upcycle", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
  const upcycle = new Upcycle({
    post_id: req.params.id,
    upcycler: req.user.id
  });
  User.findByIdAndUpdate(req.user.id, {
      $push: {upcycled_posts: req.params.id}
    }).then(user => {
      user.save();
    })
  ;

  Post.findByIdAndUpdate(req.params.id, {
    $push: { upcycler_ids: upcycle.upcycler, upcycle_ids: upcycle._id },
    $inc: {upcycle_amount: 1}
  }).then((post) => {
    post.save()
  }).catch((err) => {
      res.status(404).json({ noupcycle: "Upcycle was not created" })
  });

  upcycle
    .save()
    .then((upcycle) => res.json(upcycle))
    .catch((err) =>
      res.status(404).json({ noupcycle: "Upcycle was not created" })
    );
    
//   User.findByIdAndUpdate(post.creator_id, {
//       $inc: {hero_points: 2}
//   }).then(user => {
//       user.save()
//     .catch(err => res.status(404).json({ nopointupdate: "Points were not updated"}))
//   });

});


module.exports = router;
