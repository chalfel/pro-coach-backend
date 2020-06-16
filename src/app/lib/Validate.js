class Validate {
    hasOne (model, id) {
        return model.findById(id);   
    }
}

module.exports = new Validate();