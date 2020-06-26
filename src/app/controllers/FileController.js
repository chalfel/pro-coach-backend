const File = require('../models/File')
const responseHandler = require('../handlers/response')

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file
    try {
      const file = await File.create({
        name,
        path
      })
      return responseHandler.success(res, { url: file.url })
    } catch (e) {
      console.log(e)
      return responseHandler.error(res, e)
    }
  }
}

module.exports = new FileController()
