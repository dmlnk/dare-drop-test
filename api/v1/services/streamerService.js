const StreamerModel = require('../../models/streamer');

const create = async (streamer) => StreamerModel.Streamer.create(streamer);

const getOne = async (id) => StreamerModel.Streamer.findByPk(id);

const getAll = async (page, size) => StreamerModel.Streamer.findAndCountAll({
  limit: size,
  offset: page * size,
});

const upvote = async (id) => StreamerModel.Streamer
  .increment({ votes: 1 }, { where: { id } });

const downvote = async (id) => StreamerModel.Streamer.decrement({ votes: 1 }, { where: { id } });

module.exports = {
  create, getOne, getAll, upvote, downvote,
};
