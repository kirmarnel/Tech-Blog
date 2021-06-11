const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session.userId)
    Post.findAll({
      where: {
        user_id: req.session.userId
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'contents'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'contents'
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'Post cannot be found' });
          return;
        }
  
        const post = postData.get({ plain: true });

        res.render('editPost', {
            post,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/create/', withAuth, (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.userId
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'contents'
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('createPost', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'contents'
      ]
    })
      .then(PostData => {
        if (!PostData) {
          res.status(404).json({ message: 'No post found' });
          return;
        }
  
        const post = PostData.get({ plain: true });

        res.render('editPost', {
            post,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});






module.exports = router;