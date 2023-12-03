const { photoModel } = require('../models');

function getPhotos(req, res, next) {
    photoModel.find()
        .populate('userId')
        .then(photos => res.json(photos))
        .catch(next);
}

function getPhoto(req, res, next) {
    const { id } = req.params;

    photoModel.findById(id)
        .then(photo => res.json(photo))
        .catch(next);
}
function editPhoto(req, res, next) {
    const { id } = req.params;
    const { title, imageUrl, resolution, format, license } = req.body;
    photoModel.findByIdAndUpdate(id, { title, imageUrl, resolution, format, license })
        .then(photo => res.json(photo))
        .catch(next);
}
function createPhoto(req, res, next) {
    const { title, imageUrl, resolution, format, license} = req.body;
    const _createdOn = new Date();
    photoModel.create({ title, imageUrl, resolution, format, license, _createdOn }).then(photo => res.json(photo)).catch(next)
        
}
function deletePhoto(req, res, next) {
    const { id } = req.params;

    photoModel.findByIdAndDelete(id)
        .then(photo => res.json(photo))
        .catch(next);
}



module.exports = {
    getPhoto,
    getPhotos,
    createPhoto,
    editPhoto,
    deletePhoto
}
