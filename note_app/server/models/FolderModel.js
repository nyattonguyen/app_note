import mongoose from "mongoose";

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    authorId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const FolderModel = mongoose.model("Folder", folderSchema);
export default FolderModel;
