const User = require('../models/User');

class UserLib {

    async getExistentUser(email) {
        try {    
            const user = await User.findOne({ email });
            return user;
        } catch(e) {
            return e;
        }
    }

}


module.exports = new UserLib();