const path = require('path');
const db = require('../models');
const { Review, Project } = db;

exports.addReview = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, quote, rating } = req.body;  // Changed to match frontend fields
        const image = req.file ? path.join('uploads', req.file.filename) : null;

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                success: false, 
                message: "Rating must be between 1 and 5" 
            });
        }

        // Create review with projectId
        const newReview = await Review.create({
            projectId,
            name,
            quote,
            rating,  // Added rating field
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
            },
            include: [{
                model: Project,
                as: 'project',
                attributes: ['id', 'title']
            }]
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
