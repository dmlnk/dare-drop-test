const streamerService = require('../services/streamerService');
const settings = require('../settings');
const StreamerModel = require('../../models/streamer');

const create = async (req, res) => {
  const { name, streamingPlatform, description } = req.body;

  const streamer = await streamerService.create({
    name,
    streamingPlatform,
    description,
  });

  res.status(201).json(streamer);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const streamer = await streamerService.getOne(id);

  if (!streamer) {
    res.sendStatus(404);
    return;
  }

  res.status(200).json(streamer);
};

const getAll = async (req, res) => {
  const page = Number(req.query.page) || settings.defaultPageValue;
  const size = Number(req.query.size) || settings.defaultPageSizeValue;
  const streamers = await streamerService.getAll(page, size);

  res.status(200).json(
    { count: streamers.count, pages: Math.ceil(streamers.count / size), results: streamers.rows },
  );
};

const vote = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;

  const streamer = await streamerService.getOne(id);

  if (!streamer) {
    res.sendStatus(404);
    return;
  }

  if (action === StreamerModel.allowedVoteActionsEnum.upvote) {
    await streamerService.upvote(id);
    res.sendStatus(204);
    return;
  }

  if (action === StreamerModel.allowedVoteActionsEnum.downvote) {
    await streamerService.downvote(id);
    res.sendStatus(204);
  }
};

module.exports = {
  create, getOne, getAll, vote,
};
