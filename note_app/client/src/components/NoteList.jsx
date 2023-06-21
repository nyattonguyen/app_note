import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import moment from "moment";
import { NoteAddOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeNote } from "../util/noteUtils";

const NoteList = () => {
  const { noteId, folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const { folder } = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();
  const [anchorEl, setAnchorEl] = useState(null);
  const [noteList, setNoteList] = useState(folder.notes);

  const open = Boolean(anchorEl);
  ///\\\////
  useEffect(() => {
    if (noteId) {
      setActiveNoteId(noteId);
      return;
    }

    if (folder?.notes?.[0]) {
      navigate(`note/${folder.notes[0].id}`);
    }
  }, [noteId, folder.notes]);
  ///\\\////
  useEffect(() => {
    setNoteList([...folder.notes]);
  }, [folder.notes]);
  ///\\\////
  const handleDeleteNote = async () => {
    await removeNote({ params: { id: activeNoteId } });
    handleClose();
    const updatedNoteList = folder.notes.filter(
      (note) => note.id !== activeNoteId
    );
    setNoteList(updatedNoteList);
    Navigate("/");
  };
  const handleAddNewNote = () => {
    submit(
      {
        content: "",
        folderId,
      },
      { method: "post", action: `/folders/${folderId}` }
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <Grid container height="100%">
      <Grid
        item
        xs={4}
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: 360,
          bgcolor: "#F0EBE3",
          overflowY: "auto",
          padding: "10px",
          textAlign: "left",
        }}
      >
        <List
          subheader={
            <Box display="flex" justifyContent="space-between">
              <Typography sx={{ fontWeight: "bold" }}> Notes</Typography>
              <Tooltip title="Add note" onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined sx={{ color: "black" }} />
                </IconButton>
              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content, updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor:
                      id === activeNoteId ? "rgb(255 211 140)" : null,
                  }}
                >
                  <CardContent sx={{}}>
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || "Empty"}`,
                      }}
                    ></div>
                    <Typography sx={{ fontSize: "10px" }}>
                      {moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </Typography>
                  </CardContent>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleDeleteNote}>Delete</MenuItem>
                  </Menu>
                  <IconButton
                    sx={{ zIndex: 1 }}
                    size="small"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default NoteList;
