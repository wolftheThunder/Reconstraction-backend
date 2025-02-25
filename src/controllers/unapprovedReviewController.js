   // controllers/unapprovedReviewController.js
   const Review = require('../models/Review'); 

   exports.getUnapprovedReviews = async (req, res) => {
       try {
           const reviews = await Review.findAll({
               where: { isApproved: false }
           });

           res.json({
               success: true,
               reviews
           });
       } catch (error) {
           console.error('Error fetching unapproved reviews:', error);
           res.status(500).json({
               success: false,
               message: 'Failed to fetch unapproved reviews'
           });
       }
   };

   exports.approveReview = async (req, res) => {
       try {
           const { reviewId } = req.params;
           const review = await Review.findByPk(reviewId);

           if (!review) {
               return res.status(404).json({
                   success: false,
                   message: 'Review not found'
               });
           }

           review.isApproved = true;
           await review.save();

           res.json({
               success: true,
               message: 'Review approved successfully'
           });
       } catch (error) {
           console.error('Error approving review:', error);
           res.status(500).json({
               success: false,
               message: 'Failed to approve review'
           });
       }
   };