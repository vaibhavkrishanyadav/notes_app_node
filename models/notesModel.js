const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
    {
        owner_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: [true, "Please add the notes title"],
        },
        body: {
            type: String,
            required: [true, "Please add your notes"],
        },

    }, 
    {
        timestamps: true,
    }
);
notesSchema.index({
    title: 'text',
    body: 'text'
})
module.exports = mongoose.model("Note", notesSchema);