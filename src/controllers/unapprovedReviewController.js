const db = require('../models');
const { Review, Project } = db;  // Ensure models are properly imported

// Fetch all unapproved reviews with project info
exports.getUnapprovedReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { isApproved: false },
            include: [{ 
                model: Project, 
                as: 'project', 
                attributes: ['id', 'title']  // Fetch only necessary project fields
            }],
        });

        res.json({ success: true, reviews });
    } catch (error) {
        console.error('Error fetching unapproved reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch unapproved reviews',
            error: error.message,
        });
    }
};
// Approve a review (optimized version)
exports.approveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;

        // Directly update without fetching the review first
        const updated = await Review.update(
            { isApproved: true },
            { where: { id: reviewId } }
        );

        if (!updated[0]) {
            return res.status(404).json({ success: false, message: 'Review not found' });
        }

        res.json({ success: true, message: 'Review approved successfully' });
    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to approve review',
            error: error.message,
        });
    }
};
