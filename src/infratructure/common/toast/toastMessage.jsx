import { message, notification } from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export const SuccessMessage = (message, description) => {
  notification.success({
    message: <div className="color-success color-title">{message}</div>,
    description: <div className="color-success color-des">{description}</div>,
    icon: <CheckCircleOutlined className="color-success font-size-icon" />
  });
}

export const FailMessage = (message, description) => {
  notification.error({
    message: <div className="color-fail color-title">{message}</div>,
    description: <div className="color-fail color-des">{description}</div>,
    icon: <InfoCircleOutlined className="color-fail font-size-icon" />,
    className: "fail-message",
  });
}
export const WarningMessage = (message, description) => {
  notification.info({
    message: <div className="color-warning color-title">{message}</div>,
    description: <div className="color-warning color-des">{description}</div>,
    icon: <InfoCircleOutlined className="color-warning font-size-icon" />,
    className: "warning-message",
  });
}
