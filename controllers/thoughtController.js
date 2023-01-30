const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a specific thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought, which needs to link to user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {console.log(err);
        return res.status(500).json(err)});
  },
  // Update a specific thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }
    ).then((thought) =>
        !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
        ).catch((err) => res.status(500).json(err));
  },
  // Delete a thought and associated thoughts
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          // Update user associated with thought being deleted
          : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } }, { new: true },
          )
      )
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'User not found but thought deleted'})
          : res.json({ message: 'User and associated thoughts deleted!' })
        ).catch((err) => res.status(500).json(err));
  },
  // add a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true }
    ).then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
  // delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true }
    ).then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
};
