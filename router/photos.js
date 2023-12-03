const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');
const { photoController } = require('../controllers');
// middleware that is specific to this router

router.get('/', photoController.getPhotos);
router.get('/sorted', photoController.getSortedPhotos);
router.post('/', /* auth(), */ photoController.createPhoto);
router.delete('/delete/:id', photoController.deletePhoto);
router.get('/:id', photoController.getPhoto);
router.post('/comments/:id', /* auth(), */ commentController.createComment);
router.put('/edit/:id', /* auth(), */ photoController.editPhoto);
router.put('/photo/comments/:commentId',/*  auth(), */ commentController.editComment);
router.delete('/photo/comments/:commentId',/*  auth(), */ commentController.deleteComment);


module.exports = router