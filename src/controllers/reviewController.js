const path = require('path');
const Review = require('../models/Review'); 

exports.addReview = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, position, quote } = req.body;
        const image = req.file ? path.join('uploads', req.file.filename) : null; 

        const newReview = await Review.create({
            projectId,
            name,
            position,
            quote,
            image,
            isApproved: false 
        });

        res.status(201).json({
            success: true,
            review: newReview
        });
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add review'
        });
    }
};

exports.getReviews = async (req, res) => {
    try {
        const { projectId } = req.params;
        const reviews = await Review.findAll({
            where: {
                projectId,
                isApproved: true 
            }
        });

        res.json({
            success: true,
            reviews
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews'
        });
    }
};

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