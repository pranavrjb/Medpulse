import React from "react";
import { Button } from "@mui/material";
import API from "../api";
import { useNotification } from "../context/NotificationContext";

const TestNotification = () => {
  const { fetchNotifications } = useNotification();

  const handleCreateTestNotification = async () => {
    try {
      await API.post("/notifications/test");
      // Refresh notifications to show the new one
      fetchNotifications();
    } catch (error) {
      console.error("Error creating test notification:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateTestNotification}
      sx={{ m: 2 }}
    >
      Create Test Notification
    </Button>
  );
};

export default TestNotification;
