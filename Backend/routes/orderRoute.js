const express = require('express');
const { isAuthenticatedUser, isAuthorizerRoles } = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrders, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);
router.route('/admin/orders').get(isAuthenticatedUser, isAuthorizerRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticatedUser, isAuthorizerRoles('admin'), updateOrders).delete(isAuthenticatedUser, isAuthorizerRoles('admin'), deleteOrder);

module.exports = router;