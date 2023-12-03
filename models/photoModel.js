const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    resolution:{
        type: String,
        required: true
    },
    format:{
        type: String,
        required: true
    },
    license:{
        type: String,
        required: true
    },
    _createdOn:{
        type: Date,
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
})

module.exports = mongoose.model('Photo', photoSchema);
