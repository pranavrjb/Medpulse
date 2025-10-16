const ServiceProvider = require('../models/ServiceProvider');

const registerServiceProvider = async (req, res) => {
    const { businessName, serviceCategory, description, address, phone, email } = req.body;
    try {

        if (!businessName || !serviceCategory || !description || !address || !phone || !email) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingProvider = await ServiceProvider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({
                message: "A service provider with this email already exists"
            });
        }

        // Create new service provider
        const newServiceProvider = new ServiceProvider({
            businessName,
            serviceCategory,
            description,
            address,
            phone,
            email
        })
        await newServiceProvider.save();
        res.status(201).json({
            message: "Service provider registered successfully",
            serviceProvider: newServiceProvider
        });
    } catch (error) {
        console.error("Service provider registration error:", error);
        res.status(500).json({
            message: "Error registering service provider",
            error: error.message
        });
    }
}

const getAllServiceProviders = async (req, res) => {
    try {
        const { category } = req.query;
        let query = { status: "approved" }; // Only return approved providers

        // If category is specified, filter by it
        if (category) {
            query.serviceCategory = category;
        }

        const serviceProviders = await ServiceProvider.find(query);
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service providers", error: error.message })
    }
}

const getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: "Service provider not found" })
        }
        res.status(200).json(serviceProvider);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service provider by id", error: error.message })
    }
}

const updateServiceProvider = async (req, res) => {
    const { businessName, serviceCategory, description, address, phone, email } = req.body;
    try {
        const serviceProvider = await ServiceProvider.findByIdAndUpdate(
            req.params.id,
            { businessName, serviceCategory, description, address, phone, email },
            { new: true, runValidators: true }
        );

        if (!serviceProvider) {
            return res.status(404).json({ message: "Service provider not found" })
        }

        res.status(200).json({
            message: "Service provider updated successfully",
            serviceProvider
        });
    } catch (error) {
        console.error("Service provider update error:", error);
        res.status(500).json({
            message: "Error updating service provider",
            error: error.message
        });
    }
}

const deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: "Service provider not found" })
        }
        res.status(200).json({ message: "Service provider deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Error deleting service provider", error: error.message })
    }
}

const updateServiceProviderStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const serviceProvider = await ServiceProvider.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!serviceProvider) {
            return res.status(404).json({ message: "Service provider not found" })
        }
        res.status(200).json({
            message: "Service provider status updated successfully",
            serviceProvider
        });
    } catch (error) {
        console.error("Service provider status update error:", error);
        res.status(500).json({
            message: "Error updating service provider status",
            error: error.message
        });
    }
}

module.exports = {
    registerServiceProvider,
    getAllServiceProviders,
    getServiceProviderById,
    updateServiceProvider,
    deleteServiceProvider,
    updateServiceProviderStatus
}
