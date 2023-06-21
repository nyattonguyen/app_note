import React, { useEffect, useState } from "react";
import { createClient } from "graphql-ws";
import { Notifications } from "@mui/icons-material";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../util/contants";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});
const query = `subscription PushNotification {
    notification {
      message
    }
  }`;
export default function PushNotification() {
  const [invisible, setInvisible] = useState(true);
  const [notification, setNotification] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    if (notification) {
      setAnchorEl(e.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotification("");
    setInvisible(true);
  };
  useEffect(() => {
    (async () => {
      const onNext = (data) => {
        setInvisible(false);
        const message = data?.data?.notification?.message;
        setNotification(message);
        /* handle incoming values */
        console.log("dey ne", { data });
      };

      let unsubscribe = () => {
        /* complete the subscription */
      };

      await new Promise((resolve, reject) => {
        unsubscribe = client.subscribe(
          {
            query,
          },
          {
            next: onNext,
            error: reject,
            complete: resolve,
          }
        );
      });

      expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
    })();
  }, []);

  return (
    <>
      <Badge
        color="error"
        variant="dot"
        invisible={invisible}
        overlap="circular"
        sx={{ "&:hover": { cursor: "pointer" }, ml: "5px" }}
      >
        <Notifications onClick={handleClick} sx={{ color: "#e7cf5df2" }} />
      </Badge>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>{notification}</MenuItem>
      </Menu>
    </>
  );
}
