const { Schema, model, Types } = require('mongoose');
// to include timestamps for users' thoughts
const moment = require('moment');

// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY hh:mm a"),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY hh:mm a"),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            // true aka we want virtuals with our response
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// virtual property for number of reactions per user thought
thoughtSchema.virtual('reactionCount')
// getter
.get(function () {
    return this.reactions.length;
});

// initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;