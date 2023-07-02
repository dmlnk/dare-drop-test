const { body } = require('express-validator');
const StreamerModel = require('../models/streamer');

const onCreate = [
  body('name').exists().withMessage('Name is required').bail()
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('description').exists().withMessage('Description is required').bail()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('streamingPlatform').exists().withMessage('Streaming platform is required').bail()
    .isIn(StreamerModel.allowedPlatforms)
    .withMessage('Not allowed value'),
];

const onVote = [
  body('action').exists().withMessage('Action value is required').bail()
    .isIn(Object.values(StreamerModel.allowedVoteActionsEnum))
    .withMessage('Not allowed action'),
];

module.exports = { onCreate, onVote };
