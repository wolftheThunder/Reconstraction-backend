const db = require('../models');
const path = require('path');
const fs = require('fs').promises;

// Helper function to handle errors
const handleError = (error, customMessage) => {
    console.error(`${customMessage}:`, {
        message: error.message,
        stack: error.stack,
        name: error.name
    });
    return {
        success: false,
        message: customMessage,
        error: process.env.NODE_ENV === 'development' ? {
            message: error.message,
            name: error.name
        } : undefined
    };
};

// Helper function to delete file
const deleteFile = async (filePath) => {
    try {
        if (!filePath) return;
        const fullPath = path.join(__dirname, '..', filePath);
        await fs.unlink(fullPath);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await db.Project.findAll({
            order: [['createdAt', 'DESC']]
        });

        const transformedProjects = projects.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            mainImage: project.mainImage,
            subImages: Array.isArray(project.subImages) ? project.subImages : [],
            createdAt: project.createdAt,
            updatedAt: project.updatedAt
        }));

        res.json({ 
            success: true, 
            count: projects.length,
            projects: transformedProjects 
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to fetch projects');
        res.status(500).json(errorResponse);
    }
};

// Create project
exports.createProject = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        const { title, description } = req.body;

        // Validate input data
        if (!title || title.trim().length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Title must be at least 3 characters long'
            });
        }
        if (!description || description.trim().length < 10) {
            return res.status(400).json({
                success: false,
                message: 'Description must be at least 10 characters long'
            });
        }

        // Handle main image
        const mainImage = req.files?.mainImage?.[0]?.filename;

        // Handle sub images
        const subImages = req.files?.subImages?.map(file => `uploads/${file.filename}`) || [];

        const project = await db.Project.create({
            title,
            description,
            mainImage: mainImage ? `uploads/${mainImage}` : null,
            subImages: subImages
        });

        res.status(201).json({
            success: true,
            project
        });
    } catch (error) {
        console.error('Error creating project:', error);

        // Clean up uploaded files if there's an error
        if (req.files?.mainImage) {
            await deleteFile(path.join('uploads', req.files.mainImage[0].filename));
        }
        if (req.files?.subImages) {
            for (const file of req.files.subImages) {
                await deleteFile(path.join('uploads', file.filename));
            }
        }

        const errorResponse = handleError(error, 'Failed to create project');
        res.status(500).json(errorResponse);
    }
};
// Update project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const project = await db.Project.findByPk(id);
        if (!project) {
            return res.status(404).json({ 
                success: false, 
                message: 'Project not found' 
            });
        }

        const updateData = { title, description };

        // Handle main image update
        if (req.files?.mainImage) {
            if (project.mainImage) {
                await deleteFile(project.mainImage);
            }
            updateData.mainImage = `uploads/${req.files.mainImage[0].filename}`;
        }

        // Handle sub images update
        if (req.files?.subImages) {
            // Delete old sub images
            for (const image of project.subImages || []) {
                await deleteFile(image);
            }
            updateData.subImages = req.files.subImages
                .map(file => `uploads/${file.filename}`);
        }

        await project.update(updateData);
        res.json({
            success: true,
            project
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to update project');
        res.status(500).json(errorResponse);
    }
};

// Delete project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await db.Project.findByPk(id);

        if (!project) {
            return res.status(404).json({ 
                success: false, 
                message: 'Project not found' 
            });
        }

        // Delete associated images
        if (project.mainImage) {
            await deleteFile(project.mainImage);
        }

        for (const image of project.subImages || []) {
            await deleteFile(image);
        }

        await project.destroy();
        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to delete project');
        res.status(500).json(errorResponse);
    }
};

// Delete sub image
exports.deleteSubImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        const project = await db.Project.findByPk(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        const subImages = project.subImages.filter(img => img !== imageUrl);
        await deleteFile(imageUrl);
        await project.update({ subImages });

        res.json({
            success: true,
            message: 'Sub image deleted successfully'
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to delete sub image');
        res.status(500).json(errorResponse);
    }
};

// Get project stats
exports.getProjectStats = async (req, res) => {
    try {
        const totalCount = await db.Project.count();
        const recentProjects = await db.Project.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5,
            attributes: ['id', 'title', 'createdAt']
        });

        res.json({
            success: true,
            stats: {
                totalProjects: totalCount,
                recentProjects
            }
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to fetch project stats');
        res.status(500).json(errorResponse);
    }
};


exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await db.Project.findByPk(id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        res.json({
            success: true,
            project
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to fetch project');
        res.status(500).json(errorResponse);
    }
};
exports.deleteMainImage = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the project by ID
        const project = await db.Project.findByPk(id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        // Check if there is a main image to delete
        if (!project.mainImage) {
            return res.status(400).json({
                success: false,
                message: 'No main image to delete'
            });
        }

        // Delete the main image file
        await deleteFile(project.mainImage);

        // Update the project to remove the main image reference
        await project.update({ mainImage: null });

        res.json({
            success: true,
            message: 'Main image deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting main image:', error);
        const errorResponse = handleError(error, 'Failed to delete main image');
        res.status(500).json(errorResponse);
    }
};


exports.getLatestProjects = async (req, res) => {
    try {
        const latestProjects = await db.Project.findAll({
            order: [['createdAt', 'DESC']],
            limit: 3,
            attributes: ['id', 'title', 'description', 'mainImage', 'createdAt']
        });

        res.json({
            success: true,
            projects: latestProjects
        });
    } catch (error) {
        const errorResponse = handleError(error, 'Failed to fetch latest projects');
        res.status(500).json(errorResponse);
    }
};