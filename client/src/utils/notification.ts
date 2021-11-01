import { notification } from "antd";
export const messageNotification = (data: {
  codeStatus: number;
  message: string;
}) => {
  notification.config({ duration: 2, top: 70, placement: "topRight" });
  if (data.codeStatus >= 200 && data.codeStatus < 300) {
    notification.open({
      message: data.message,
      type: "success",
      style: { width: 300 },
    });
  } else if (data.codeStatus >= 400 && data.codeStatus < 500) {
    notification.open({
      message: data.message,
      type: "error",
      style: { width: 400 },
    });
  } else {
    notification.open({
      message: data.message,
      type: "info",
      style: { width: 400 },
    });
  }
};
