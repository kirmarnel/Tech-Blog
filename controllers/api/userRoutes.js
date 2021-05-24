const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {

        const userData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
       

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)

    }

});

router.post('/login', async (req, res) => {

    try{

        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData){
            res.status(400).json({message: 'Sorry, incorrect username or password. Please try again!'});
            return;
        }

        const validUser = await userData.checkPassword(req.body.password);

        if (!validUser){
            res.status(400).json({message: 'Sorry, incorrect username or password. Please try again!'});
            return;
        }

        req.session.save(() => {
    
            req.session.loggedIn = true;
      
            res.status(200).json({ user: userData, message: 'Success! You are now logged in!' });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
     }
     
});

router.post('/logout', async (req, res) => {

    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
        
    }
});

module.exports = router;