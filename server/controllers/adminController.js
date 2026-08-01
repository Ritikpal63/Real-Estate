const PropertyModel = require("../models/propertyModel");
const ServiceModel = require("../models/serviceModel");
const GalleryModel = require("../models/galleryModel");
const ContactModel = require("../models/contactModel");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProperties = await PropertyModel.getCount();

    const totalServices = await ServiceModel.getCount();

    const totalGallery = await GalleryModel.getCount();

    const totalLeads = await ContactModel.getCount();

    const recentProperties = await PropertyModel.find()
      .sort({ created_at: -1 })
      .limit(5)
      .execute();

    const monthlyProperty = await PropertyModel.aggregate("monthlyProperty");

    res.status(200).json({
      success: true,

      stats: {
        totalProperties,
        totalServices,
        totalGallery,
        totalLeads,
      },

      recentProperties,

      monthlyProperty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
