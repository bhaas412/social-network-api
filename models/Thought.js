const { Schema, model } = require('mongoose');
const format_time = require('../utils/helpers');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: { 
        type: String, 
        min: [1,'Thought must be a minimum of 1 character.'],
        max: [280, 'Character length cannot exceed 280 characters.'],
        unique: true, 
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: format_time,
        required: true},
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reactions: [Reaction]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `commentCount` that gets the amount of comments per post
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;