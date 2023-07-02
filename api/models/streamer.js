const { DataTypes } = require('sequelize');
const database = require('../config/database');

const allowedPlatforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];
const allowedVoteActionsEnum = { upvote: 'upvote', downvote: 'downvote' };

const Streamer = database.define('Streamer', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  streamingPlatform: {
    type: DataTypes.ENUM,
    values: allowedPlatforms,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = { Streamer, allowedPlatforms, allowedVoteActionsEnum };
