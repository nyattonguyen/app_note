import React, { useEffect, useMemo, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { useLoaderData, useSubmit, useLocation } from "react-router-dom";
import { debounce } from "@mui/material";

const Note = () => {
  const { note } = useLoaderData();
  const [rawHTML, setRawHTML] = useState(note.content);
  const submit = useSubmit();
  const location = useLocation();
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    debouncedMemorized(rawHTML, note, location.pathname);
  }, [rawHTML, location.pathname]);

  const debouncedMemorized = useMemo(() => {
    return debounce((rawHTML, note, pathname) => {
      if (rawHTML === note.content) {
        return;
      }
      submit(
        { ...note, content: rawHTML },
        {
          method: "post",
          action: pathname,
        }
      );
    }, 1500);
  }, []);

  const handleOnChage = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChage}
      placeholder="Write here"
    />
  );
};

export default Note;
