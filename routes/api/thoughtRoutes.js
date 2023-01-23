const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// to get and post all thoughts
router.route('/').get(getThought).post(createThought);

// to get update and delete specific thoughts
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// to add reactions by id
router.route('/:thoughtId/reactions').post(createReaction);

// to delete reactions by id
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;