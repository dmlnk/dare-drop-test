const Router = require('express');
const streamersRouter = require('./streamerRouter');

const router = Router();

router.use('/streamers', streamersRouter);

module.exports = router;
