const router = require('express').Router();
const  Posts  = require("../models/blogPosts.js");


router.get('/', async (req, res) => {
    // console.log(req.findAll())
    // console.log(res.findAll())
    try {
       
      const postData = await Posts.findAll();
    
  
      const posts = postData.map((post) =>
        post.get({ plain: true })
      );

      res.render('dashboard', {
        posts,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

    router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});




module.exports = router;