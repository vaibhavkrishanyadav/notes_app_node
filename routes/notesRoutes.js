const express = require("express");
const router = express.Router();
const {getNotes, createNote, getNote, updateNote, deleteNote, searchNotes, shareNote} = require("../controllers/notesController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route('/notes').get(getNotes).post(createNote);
router.route('/notes/:id').get(getNote).put(updateNote).delete(deleteNote);
router.route('/notes/:id/share').post(shareNote);
router.route('/search').get(searchNotes);

module.exports = router;