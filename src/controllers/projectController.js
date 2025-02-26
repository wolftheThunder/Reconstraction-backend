const db = require('../models');
const { Project, Review } = db;
const path = require('path');
const fs = require('fs').promises;

// ✅ Centralized Error Handling Function
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

// ✅ Utility Function to Delete a File
const deleteFile = async (filePath) => {
    try {
        if (!filePath) return;
        const fullPath = path.join(__dirname, '..', filePath);
        await fs.unlink(fullPath);
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

// ✅ Get All Projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });

        res.json({ 
            success: true, 
            count: projects.length,
            projects
        });
    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to fetch projects'));
    }
};

// ✅ Create a New Project
exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;

        // ✅ Validate Input
        if (!title || title.length < 3) {
            return res.status(400).json({ success: false, message: 'Title must be at least 3 characters long' });
        }
        if (!description || description.length < 10) {
            return res.status(400).json({ success: false, message: 'Description must be at least 10 characters long' });
        }

        // ✅ Handle Images
        const mainImage = req.files?.mainImage?.[0]?.filename ? `uploads/${req.files.mainImage[0].filename}` : null;
        const subImages = req.files?.subImages?.map(file => `uploads/${file.filename}`) || [];

        // ✅ Create Project
        const project = await Project.create({ title, description, mainImage, subImages });

        res.status(201).json({ success: true, project });

    } catch (error) {
        console.error('Error creating project:', error);

        // ✅ Cleanup Uploaded Files if Error Occurs
        if (req.files?.mainImage) await deleteFile(`uploads/${req.files.mainImage[0].filename}`);
        if (req.files?.subImages) {
            for (const file of req.files.subImages) {
                await deleteFile(`uploads/${file.filename}`);
            }
        }

        res.status(500).json(handleError(error, 'Failed to create project'));
    }
};

// ✅ Update a Project
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        const updateData = { title, description };

        // ✅ Handle Main Image Update
        if (req.files?.mainImage) {
            if (project.mainImage) await deleteFile(project.mainImage);
            updateData.mainImage = `uploads/${req.files.mainImage[0].filename}`;
        }

        // ✅ Merge New and Existing Sub Images
        if (req.files?.subImages) {
            const newSubImages = req.files.subImages.map(file => `uploads/${file.filename}`);
            updateData.subImages = project.subImages ? [...project.subImages, ...newSubImages] : newSubImages;
        }

        await project.update(updateData);
        res.json({ success: true, project });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to update project'));
    }
};

// ✅ Delete a Project
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id, { include: [{ model: Review, as: 'reviews' }] });
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        await Review.destroy({ where: { projectId: id } });

        // ✅ Delete Files
        if (project.mainImage) await deleteFile(project.mainImage);
        if (project.subImages) {
            for (const image of project.subImages) {
                await deleteFile(image);
            }
        }

        await project.destroy();
        res.json({ success: true, message: 'Project deleted successfully' });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to delete project'));
    }
};

// ✅ Delete a Specific Sub-Image
exports.deleteSubImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        const updatedSubImages = project.subImages.filter(img => img !== imageUrl);
        await deleteFile(imageUrl);
        await project.update({ subImages: updatedSubImages });

        res.json({ success: true, message: 'Sub image deleted successfully' });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to delete sub image'));
    }
};

// ✅ Delete Main Image
exports.deleteMainImage = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findByPk(id);
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        if (!project.mainImage) return res.status(400).json({ success: false, message: 'No main image to delete' });

        await deleteFile(project.mainImage);
        await project.update({ mainImage: null });

        res.json({ success: true, message: 'Main image deleted successfully' });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to delete main image'));
    }
};

// ✅ Get Project By ID
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);

        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        res.json({ success: true, project });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to fetch project'));
    }
};

// ✅ Get Latest Projects
exports.getLatestProjects = async (req, res) => {
    try {
        const latestProjects = await Project.findAll({
            order: [['createdAt', 'DESC']],
            limit: 3,
            attributes: ['id', 'title', 'mainImage', 'createdAt']
        });

        if (latestProjects.length === 0) {
            return res.status(404).json({ success: false, message: 'No projects found' });
        }

        res.json({ success: true, projects: latestProjects });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to fetch latest projects'));
    }
};

// ✅ Get Project By Slug
exports.getProjectBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const project = await Project.findOne({ where: { slug } });

        if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

        res.json({ success: true, project });

    } catch (error) {
        res.status(500).json(handleError(error, 'Failed to fetch project'));
    }
};
