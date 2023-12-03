const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "User"
    },
    photoId: {
        type: ObjectId,
        ref: "Photo"
    },
    _createdOn:{
        type:Date
    }
})

module.exports = mongoose.model('Comment', commentSchema);
