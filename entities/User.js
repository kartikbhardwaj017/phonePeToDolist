const { v4: uuidv4 } = require('uuid');

class User {
    constructor(name) {
        this.name = name;
        this.id = uuidv4();
    }
}

module.exports = User;