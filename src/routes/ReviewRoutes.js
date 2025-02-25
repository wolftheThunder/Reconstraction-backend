const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const reviewController = require('../controllers/reviewController');
const asyncHandler = require('../middleware/asyncHandler'); 


router.get('/:projectId/reviews', asyncHandler(reviewController.getReviews));

router.post('/:projectId/reviews', upload.single('image'), asyncHandler(reviewController.addReview));


module.exports = router;