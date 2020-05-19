const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    data: { type: Buffer },
    contentType: {type: String },
    name: { type: String },
    size: { type: Number },
    key: { type: String },
    url: { type: String },
    creatdAt: {
      type: Date,
      default: Date.now
    },
    denuncia: {type: mongoose.Schema.Types.ObjectId, ref: 'Denuncia'}
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image;