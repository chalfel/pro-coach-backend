const File = require('../models/File')
const responseHandler = require('../handlers/response')

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file
      const file = await File.create({
        name,
        path
      })
      return responseHandler.success(res, { url: file.url })
    } catch (e) {
      return responseHandler.error(res, e)
    }
  }
}

module.exports = new FileController()
