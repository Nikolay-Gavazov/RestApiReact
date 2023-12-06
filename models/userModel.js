const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.SALTROUNDS) || 5;

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return  /^[a-zA-Z\.-]{2,}[0-9]*@[a-z]+\.[a-z]{2,}$/gm.test(v);
            },
            message: props => `${props.value} is not valid email address`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contains only latin letters and digits!`
        }
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"}],
    isAdmin:{
        type: Boolean,
    }
    
})

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                next(err);
            }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    next(err);
                }
                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
})

module.exports = mongoose.model('User', userSchema);
