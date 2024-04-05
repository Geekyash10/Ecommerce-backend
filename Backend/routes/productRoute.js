const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct, createProductReview, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, isAuthorizerRoles } = require('../middleware/auth');
const router = express.Router();
router.route('/products').get(getAllProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, isAuthorizerRoles("admin"), createProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, isAuthorizerRoles("admin"), updateProduct).delete(isAuthenticatedUser, isAuthorizerRoles("admin"), deleteProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/review').put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
module.exports = router
