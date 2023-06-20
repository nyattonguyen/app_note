import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    folderId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Note", noteSchema);
export default NoteModel;
