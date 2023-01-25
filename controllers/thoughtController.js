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
<<<<<<< HEAD
  // Update a specific thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true }
=======
  // update a specific thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
>>>>>>> 521b8ee0f8f1aa49e436294126be540473c47818
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
<<<<<<< HEAD
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
  deleteReaction(req, req) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true }
    ).then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
    ).catch((err) => res.status(500).json(err));
  },
=======
          // need to update this to update the user
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // add a reaction
  // delete a reaction
>>>>>>> 521b8ee0f8f1aa49e436294126be540473c47818
};
