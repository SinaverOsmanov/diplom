import { message } from "antd";

export const messageNotification = ({
  codeStatus,
  messageRequest,
}: {
  codeStatus: number;
  messageRequest: string;
}) => {
  const messageStyle = { fontSize: "16px", heigth: "64px" };
  message.config({ duration: 2, maxCount: 3, top: 2 });
  if (codeStatus >= 200 && codeStatus < 300) {
    message.success({
      content: messageRequest,
      style: messageStyle,
    });
  } else if (codeStatus >= 400 && messageRequest === "Failed to fetch") {
    message.error({
      content: "Ошибка сервера, попробуйте попозже",
      style: messageStyle,
    });
  } else if (codeStatus >= 400 && codeStatus < 500) {
    message.error({
      content: messageRequest,
      style: messageStyle,
    });
  } else {
    message.info({
      content: messageRequest,
      style: messageStyle,
    });
  }
};
