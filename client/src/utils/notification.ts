import { notification } from "antd";
notification.config({ duration: 2 });
export const messageNotification = (data: {
  codeStatus: number;
  message: string;
}) => {
  if (data.codeStatus >= 200 && data.codeStatus < 300) {
    notification.success({ message: data.message });
  } else if (data.codeStatus >= 400 && data.codeStatus < 500) {
    notification.error({ message: data.message });
  } else {
    notification.info({ message: data.message });
  }
};
