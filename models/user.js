const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }
)

userSchema.pre(
    'save',
    async (next) => {
        const user = this;
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    }
)

userSchema.methods.isValidPassword = async (password) => {
    const user = this;
    const compare = await bcrypt.compare(password, user.password)

    return compare
}

module.exports = mongoose.model('User', userSchema)