const router = require('express').Router();
const { Post } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'postContent'
        ]
    })
      .then(postData => res.json(postData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'postContent'
      ]
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'Post Cannot be found' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/', withAuth, (req, res) => {
  console.log(req.body)
    const body = req.body
    try {

    
  const newPost = Post.create({
     title: req.body.title,
     contents: req.body.postContent,
    user_id: req.session.userId
    })
    res.json(newPost)
  }
      catch(err){
        console.log(err);
        res.status(500).json(err);
      };
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        postContent: req.body.postContent
      },
      {
        where: {
          id: req.params.id
        }
      })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'Post cannot be found' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(postData => {
        if (!postData) {
          res.status(404).json({ message: 'Post cannot be found' });
          return;
        }
        res.json(postData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;