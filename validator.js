const Joi = require("joi");

const validator = (schema) =>(payload)=>
    schema.validate(payload,{abortEarly:false});

    const satelliteSchema = Joi.object({
        satellite: Joi.string().required(),
        agenda: Joi.string().required(),
        launch_date: Joi.string().required(),
        launch_vehicle: Joi.string().required(), 
        launch_site: Joi.string().required(), 
        image_url: Joi.string(),
        updated_user: Joi.string()
    })

exports.validateSatellite = validator(satelliteSchema)