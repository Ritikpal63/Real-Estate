const PropertyModel = require('../models/propertyModel');

class PropertyController{
  static async getAllProperty(req, res){
    try {
      const property = await PropertyModel.getAllProperty();
      const total = await PropertyModel.getCount();
    res.json({
      success:true,
      data:property,
      pagination:{
        total
      }
    })
    } catch (error) {
      res.json({
        success:false,
        message:"Property Count Function Has Error"
      })
    }
  }
}

module.exports = PropertyController