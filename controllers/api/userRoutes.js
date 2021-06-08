const router = require('express').Router();
const { User, Post } = require('../../models');


router.get('/', (req, res) => {

    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            }
        ]

    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'User cannot be found' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/signup', async (req, res) => {
    try {
        
    
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
    })
        
            req.session.save(() => {
                req.session.userId = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;

                res.json(newUser);
            });
        }
    catch (err) {
        console.log(err)
        res.json(err)
    }
});



  router.post('/login', (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(userData => {
      if (!userData) {
        res.status(400).json({ message: 'Could not find username' });
        return;
      }

      const validPassword = userData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'Password is incorrect' });
        return;
      }

      req.session.save(() => {
        // declare session variables
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json({ user: userData, message: 'Login Sucessful' });
      });
    });
  });




router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


module.exports = router;