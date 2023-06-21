import {
  Box,
  Card,
  CardContent,
  IconButton,
  List,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import NewFolder from "./NewFolder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { removeFolder } from "../util/folderUtils";

const FolderList = ({ folders }) => {
  const { folderId } = useParams();
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [folderList, setFolderList] = useState(folders);
  const open = Boolean(anchorEl);

  const handleDeleteFolder = async () => {
    await removeFolder({ params: { id: activeFolderId } });
    setActiveFolderId("");
    handleClose();
    const updatedFolderList = folderList.filter(
      (folder) => folder.id !== activeFolderId
    );
    setFolderList(updatedFolderList);
    Navigate("/");
    console.log(folderList);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleFolderAdded = (newFolder) => {
    setFolderList((prevFolderList) => [...prevFolderList, newFolder]);
  };
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#12224ef0",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflowY: "auto",
      }}
      subheader={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
          <NewFolder onFolderAdded={handleFolderAdded} />
        </Box>
      }
    >
      {folderList.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{ textDecoration: "none" }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 140)" : null,
              }}
            >
              <CardContent
                sx={{
                  pointerEvents: "none",
                  "&:last-child": { pb: "10px" },
                  padding: "10px",
                }}
              >
                <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                  {name}
                </Typography>
              </CardContent>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
              </Menu>
              <IconButton sx={{ zIndex: 1 }} size="small" onClick={handleClick}>
                <MoreHorizIcon fontSize="large" color="black" on />
              </IconButton>
            </Card>
          </Link>
        );
      })}
    </List>
  );
};

export default FolderList;
