import axios from "axios";

export const listNotificationService = async () => {
  return await axios.get(`${process.env.REACT_APP_BACKEND_URL}notifications`);
};

export const readNotificationService = async (payload) => {
  const { notification_id } = payload;
  return await axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}notifications/${notification_id}`
  );
};
