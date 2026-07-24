const PropertyModel = require('../models/propertyModel');

class PropertyController{
  static async getAllProperty(req, res){
    try {
      const total = await PropertyModel.getCount();
    res.json({
      success:true,
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