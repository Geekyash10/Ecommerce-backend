const express = require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getDetails, updatePassword, updateProfile, getAllUsers, getOneUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, isAuthorizerRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset:token").put(resetPassword);
router.route('/logout').get(logout)
router.route('/me').get(isAuthenticatedUser, getDetails)
router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile)
router.route('/admin/users').get(isAuthenticatedUser, isAuthorizerRoles("admin"), getAllUsers)
router.route('/admin/user/:id').get(isAuthenticatedUser, isAuthorizerRoles("admin"), getOneUser).put(isAuthenticatedUser, isAuthorizerRoles("admin"), updateUserRole).delete(isAuthenticatedUser, isAuthorizerRoles("admin"), deleteUser)
module.exports = router;
// sabka control isi file se hai ye file sabse main hai
// isme saare rotes hai 
// jo jo kaam ho raha hai sab yehi hai
// iss file ka connection pura controller ke hath me hai
