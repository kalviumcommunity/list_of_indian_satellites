const mongoose = require('mongoose')

const data = new mongoose.Schema({
    satellite: {
        type: String,
        required: true
      },
      agenda: {
        type: String,
        required: true
      },
      launch_date: {
        type: String,
        required: false
      },
      launch_vehicle: {
        type: String,
        required: true
      },
      launch_site: {
        type: String,
        required: true
      }
});
const dataSet = mongoose.model('dataSet',data);
module.exports=dataSet;