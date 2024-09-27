// Simulating a notification database
let notificationsDb = {};

// Send notification to a specific user
const sendToUser = async (userId, notification) => {
  if (!notificationsDb[userId]) {
    notificationsDb[userId] = [];
  }
  notificationsDb[userId].push({ ...notification, status: "unread" });
};

// Broadcast notification to all users
const broadcast = async (notification) => {
  // Broadcast to all connected users
  for (let userId in notificationsDb) {
    notificationsDb[userId].push({ ...notification, status: "unread" });
  }
  const broadcastNotification = global.app.get("broadcastNotification");
  broadcastNotification(notification);
};

// Get notifications for a specific user
const getUserNotifications = async (userId) => {
  return notificationsDb[userId] || [];
};

// Mark notifications as read
const markAsRead = async (userId, notificationIds) => {
  const userNotifications = notificationsDb[userId];
  if (userNotifications) {
    userNotifications.forEach((notification) => {
      if (notificationIds.includes(notification.id)) {
        notification.status = "read";
      }
    });
  }
};

module.exports = {
  sendToUser,
  broadcast,
  getUserNotifications,
  markAsRead,
};
