import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export const handleClick = (message: string) => {
  // Display a notification when the button is clicked
  NotificationManager.info(message, "Notification", 3000);
};
