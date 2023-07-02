const express = require('express');
const validateRequest = require('../../middleware/validateRequest');
const validators = require('../../validators/streamer');

const router = express.Router();
const streamerController = require('../controllers/streamerController');

router.get('/', streamerController.getAll);
router.get('/:id', streamerController.getOne);
router.post('/', validators.onCreate, validateRequest, streamerController.create);
router.put('/:id/vote', validators.onVote, validateRequest, streamerController.vote);

module.exports = router;
