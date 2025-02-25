   
   const express = require('express');
   const router = express.Router();
   const unapprovedReviewController = require('../controllers/unapprovedReviewController');
   const asyncHandler = require('../middleware/asyncHandler');

   router.get('/', asyncHandler(unapprovedReviewController.getUnapprovedReviews));

   router.put('/:reviewId/approve', asyncHandler(unapprovedReviewController.approveReview));

   module.exports = router;