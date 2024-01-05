const asyncHandler = require("express-async-Handler");
const Note = require("../models/notesModel");

//@desc Get all notes
//@route GET /api/notes
//@access private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find( {$or:[{ owner_id: req.user.id }, {sharedWith: req.user.id}]} ); 
    res.status(200).json(notes);
});

//@desc Create new notes
//@route POST /api/notes
//@access private
const createNote = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const {title, body} = req.body;
    if(!title || !body) {
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const note = await Note.create({
        title, 
        body,
        owner_id: req.user.id,
    });
    res.status(201).json(note);
});

//@desc Get notes
//@route GET /api/notes/:id
//@access private
const getNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    res.status(200).json(note);
});

//@desc Update notes
//@route PUT /api/notes/:id
//@access private
const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    if( note.owner_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other notes");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedNote);
});

//@desc Delete notes
//@route DELETE /api/notes/:id
//@access private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if(!note) {
        res.status(404);
        throw new Error("note not found");
    }
    
    if( note.owner_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other notes");
    }

    await Note.deleteOne({ _id: req.params.id });
    res.status(200).json(note);
});


//@desc Get all searched notes
//@route GET /api/search/?q=<searched word>
//@access private
const searchNotes = asyncHandler(async (req, res) => {
    console.log(req.user.id);
    const notes = await Note.find({ owner_id: req.user.id, $text:  {$search: req.query.q}}).sort({updatedAt: -1});
    res.status(200).json(notes);
});

//@desc Update notes
//@route PUT /api/notes/:id
//@access private
const shareNote = asyncHandler(async (req, res) => {
    console.log("The request body is :", req.body);
    const { viewer_id } = req.body; 
    if(!viewer_id) {
        res.status(400);
        throw new Error("Viewer ID not found");
    }

    const note = await Note.findById(req.params.id);
    if(!note) {
        res.status(404);
        throw new Error("Note not found");
    }

    if( note.owner_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other notes");
    }

    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { "$push": { sharedWith: viewer_id } },
        { new: true, "upsert": true }, 
    );

    res.status(200).json(updatedNote);
});

module.exports = {getNotes, createNote, getNote, updateNote, deleteNote, searchNotes, shareNote};