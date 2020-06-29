const mongoose = require('mongoose')

const File = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  }
})

File.virtual('url')
  .get(function (req) {
    return `${process.env.APP_URL}/files/${this.path}`
  })
  .set(function (val) {
    this._url = val
    console.log('setting: ', val)
  })

module.exports = mongoose.model('File', File)
