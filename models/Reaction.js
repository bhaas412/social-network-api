const { Schema, Types } = require('mongoose');
const format_time = require('../utils/helpers');

const reactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId, 
        default:  () => new Types.ObjectId()
    },
    reactionBody: { 
        type: String, 
        required: true, 
        min: [1, 'Thought must be at least 1 character in length.'],
        max: [280, 'Thought cannot exceed 280 characters in length.']
    },
    username: {
        type: Schema.Types.ObjectId,
        ref: 'user'},
    createdAt: { 
        type: Date, 
        default: Date.now, 
        get: format_time,
        required: true
    }
  });

module.exports = reactionSchema;