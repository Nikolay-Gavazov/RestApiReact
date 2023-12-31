const { userModel, photoModel, commentModel } = require("../models");

function newComment(text, userId, photoId,email, _createdOn) {
    return commentModel.create({ text, userId, photoId,email, _createdOn})
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id } }),
                photoModel.findByIdAndUpdate({ _id: photoId }, { $push: { comments: comment._id } }, { new: true })
            ])
        })
}

function getComments(req, res, next) {
  const { id } = req.params;
  commentModel
    .find({ photoId: id })
    .populate("photoId userId")
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch(next);
}

function createComment(req, res, next) {
  const { id } = req.params;
  const { email, text, userId } = req.body;
  const _createdOn = Date.now();
  commentModel
    .create({text, userId, photoId:id, email, _createdOn})
    .then((comment) => res.status(200).json(comment))
    .catch(next);
}

function editComment(req, res, next) {
  const { commentId } = req.params;
  const { text } = req.body;
  const { _id: userId } = req.user;

  // if the userId is not the same as this one of the post, the post will not be updated
  commentModel
    .findOneAndUpdate({ _id: commentId, userId }, { text: text }, { new: true })
    .then((updatedComment) => {
      if (updatedComment) {
        res.status(200).json(updatedComment);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  const { commentId, photoId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    commentModel.findOneAndDelete({ _id: commentId, userId }),
    userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { comments: commentId } }
    ),
    photoModel.findOneAndUpdate(
      { _id: photoId },
      { $pull: { comments: commentId } }
    ),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function like(req, res, next) {
  const { commentId } = req.params;
  const { _id: userId } = req.user;

  console.log("like");

  commentModel
    .updateOne(
      { _id: commentId },
      { $addToSet: { likes: userId } },
      { new: true }
    )
    .then(() => res.status(200).json({ message: "Liked successful!" }))
    .catch(next);
}

module.exports = {
  getComments,
  newComment,
  createComment,
  editComment,
  deleteComment,
  like,
};
