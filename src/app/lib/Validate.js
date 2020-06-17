class Validate {
    async hasOne (model, id) {
        return model.findById(id);   
    }
}

module.exports = new Validate();