const express = require("express");
const router = express.Router();
const {getNotes, createNote, getNote, updateNote, deleteNote, searchNotes} = require("../controllers/notesController");
const validateToken = require("../middleware/validateTokenHandler");


router.use(validateToken);
router.route('/notes').get(getNotes).post(createNote);
router.route('/notes/:id').get(getNote).put(updateNote).delete(deleteNote);
router.route('/search').get(searchNotes);

module.exports = router;


// GET /api/search?q=:query: search for notes 