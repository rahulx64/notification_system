const express = require("express");
const router = express.Router();
const notificationService = require("../services/notificationService");

// Send notification (Targeted or Broadcast)
router.post("/send", async (req, res) => {
  const { target, userId, message, source, timestamp } = req.body;

  try {
    if (target === "specific") {
      await notificationService.sendToUser(userId, {
        message,
        source,
        timestamp,
      });
    } else if (target === "all_users") {
      await notificationService.broadcast({ message, source, timestamp });
    }
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Failed to send notification" });
  }
});

// Fetch notifications for specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await notificationService.getUserNotifications(
      userId
    );
    res.status(200).send(notifications);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch notifications" });
  }
});

// Mark notifications as read
router.post("/read", async (req, res) => {
  const { userId, notificationIds } = req.body;
  try {
    await notificationService.markAsRead(userId, notificationIds);
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: "Failed to mark notifications as read" });
  }
});

module.exports = router;
