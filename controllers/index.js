const router = require('express').Router();

const homeRoutes = require('./home-routes.js');
const dashRoutes = require('./dashRoutes.js');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/dashboard', dashRoutes);
router.use('/api', apiRoutes);

module.exports = router;