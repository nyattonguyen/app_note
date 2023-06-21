import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CreateNewFolderOutlined } from "@mui/icons-material";
import { addNewFolder } from "../util/folderUtils";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function NewFolder({ onFolderAdded }) {
  const [newFolderName, setNewFolderName] = useState("");
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const popupName = searchParams.get("popup");
  const navigate = useNavigate();

  const handleOpenPopup = () => {
    setSearchParams({ popup: "add-folder" });
  };
  const handleNewFolderNameChange = (e) => {
    setNewFolderName(e.target.value);
  };
  const handleClose = () => {
    setNewFolderName("");
    navigate(-1);
  };

  const handleAddNewFolder = async () => {
    const { addFolder } = await addNewFolder({ name: newFolderName });
    console.log({ addFolder });

    handleClose();
    if (onFolderAdded) {
      onFolderAdded(addFolder); // Gọi hàm callback để thông báo thêm thư mục mới
    }
  };

  useEffect(() => {
    if (popupName == "add-folder") {
      setOpen(true);
      return;
    } else {
      setOpen(false);
    }
  }, [popupName]);
  return (
    <div>
      <Tooltip title="Add Folder" onClick={handleOpenPopup}>
        <IconButton size="small">
          <CreateNewFolderOutlined sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle> New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
            size="small"
            variant="standard"
            sx={{ width: "400px" }}
            autoComplete="off"
            value={newFolderName}
            onChange={handleNewFolderNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancle</Button>
          <Button onClick={handleAddNewFolder}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
