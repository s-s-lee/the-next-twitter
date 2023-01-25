const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId to get put and delete by userID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users to post and delete a friend by friendID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;