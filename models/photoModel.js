const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    imageUrl:{
        type: String,
        required: true
    },
    resolution:{
        type: String,
        required: true,
        minlength: 7
    },
    format:{
        type: String,
        required: true,
        minlength: 3
    },
    license:{
        type: String,
        required: true,
        minlength: 4
    },
    _createdOn:{
        type: Date,
    },
    _ownerId:{
        type:ObjectId
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }],
})

module.exports = mongoose.model('Photo', photoSchema);
