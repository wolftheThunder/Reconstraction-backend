const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../config/multer');
const multer = require('multer');

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            message: 'File upload error',
            error: err.message
        });
    }
    next(err);
};

// Configure multer for multiple file uploads
const uploadFields = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 5 }
]);

// Wrap async route handlers
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Routes
router.get('/', asyncHandler(projectController.getAllProjects));
router.post('/create', uploadFields, handleMulterError, asyncHandler(projectController.createProject));
router.get('/:id', asyncHandler(projectController.getProjectById));
router.put('/:id', uploadFields, handleMulterError, asyncHandler(projectController.updateProject));
router.delete('/:id', asyncHandler(projectController.deleteProject));
router.delete('/:id/subImage', asyncHandler(projectController.deleteSubImage));
router.delete('/:id/mainImage', asyncHandler(projectController.deleteMainImage));
router.get('/stats', asyncHandler(projectController.getProjectStats));
router.get('/latest', asyncHandler(projectController.getLatestProjects));

// Error handler
router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong'
    });
});

module.exports = router;