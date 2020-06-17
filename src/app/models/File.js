const mongoose = require('mongoose');


const File = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
});

File.virtual('url')
    .get(function() { return `http://localhost:3333/files/${this.path}` })
    .set(function(val) { 
        this._url = val;
        console.log("setting: ", val);
    });

module.exports = mongoose.model('File', File);