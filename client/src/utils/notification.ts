import { message } from "antd";

export const messageNotification = (data: {
  codeStatus: number;
  message: string;
}) => {
  const messageStyle = { fontSize: "16px", heigth: "64px" };

  message.config({ duration: 2, maxCount: 3, top: 2 });
  if (data.codeStatus >= 200 && data.codeStatus < 300) {
    message.success({
      content: data.message,
      style: messageStyle,
    });
  } else if (data.codeStatus >= 400 && data.codeStatus < 500) {
    message.error({
      content: data.message,
      style: messageStyle,
    });
  } else {
    message.info({
      content: data.message,
      style: messageStyle,
    });
  }
};
