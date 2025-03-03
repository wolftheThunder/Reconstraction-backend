const db = require('../models');
const { Service } = db;
const path = require('path');
const fs = require('fs').promises;

const deleteFile = async (filePath) => {
  try {
    if (!filePath) return;
    const fullPath = path.join(__dirname, '..', '..', filePath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['createdAt', 'DESC']] });
    
    res.json({ 
      success: true, 
      count: services.length,
      services
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch services',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByPk(id);
    
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    res.json({ success: true, service });
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.length < 3) {
      return res.status(400).json({ success: false, message: 'Title must be at least 3 characters long' });
    }
    if (!description || description.length < 10) {
      return res.status(400).json({ success: false, message: 'Description must be at least 10 characters long' });
    }
    
    if (!req.files?.beforeImage || !req.files?.afterImage) {
      return res.status(400).json({ success: false, message: 'Both before and after images are required' });
    }
    
    const beforeImage = `uploads/${req.files.beforeImage[0].filename}`;
    const afterImage = `uploads/${req.files.afterImage[0].filename}`;
    
    const service = await Service.create({
      title,
      description,
      beforeImage,
      afterImage
    });
    
    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error('Error creating service:', error);
    
    if (req.files?.beforeImage) {
      await deleteFile(`uploads/${req.files.beforeImage[0].filename}`);
    }
    if (req.files?.afterImage) {
      await deleteFile(`uploads/${req.files.afterImage[0].filename}`);
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    const updateData = { title, description };
    
    if (req.files?.beforeImage) {
      if (service.beforeImage) {
        await deleteFile(service.beforeImage);
      }
      updateData.beforeImage = `uploads/${req.files.beforeImage[0].filename}`;
    }
    
    if (req.files?.afterImage) {
      if (service.afterImage) {
        await deleteFile(service.afterImage);
      }
      updateData.afterImage = `uploads/${req.files.afterImage[0].filename}`;
    }
    
    await service.update(updateData);
    res.json({ success: true, service });
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    
    if (service.beforeImage) {
      await deleteFile(service.beforeImage);
    }
    if (service.afterImage) {
      await deleteFile(service.afterImage);
    }
    
    await service.destroy();
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};