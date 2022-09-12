import React, { ReactNode } from "react";
import { CloseButtonProps } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Alert, Button } from "antd";
import {
  CloseCircleFilled,
  CloseCircleTwoTone,
  CloseOutlined,
} from "@ant-design/icons";

type ToastProps = {
  title?: ReactNode;
  description: ReactNode;
};

const sharedStyles = {
  height: "100%",
  border: "none",
};

export const CloseToastButton = ({ closeToast }: CloseButtonProps) => {
  return (
    <CloseCircleTwoTone
      onClick={closeToast}
      twoToneColor="#2F2F2FFF"
      style={{
        margin: "auto",
        width: 30,
        position: "absolute",
        right: 5,
        top: 10,
        fontSize: 16,
      }}
    />
  );
};

export const SuccessToastUi = ({ title, description }: ToastProps) => {
  return (
    <Alert
      message={title}
      description={description}
      showIcon
      type="success"
      style={{ background: "#1b7700", ...sharedStyles }}
    />
  );
};

export const WarningToastUi = ({ title, description }: ToastProps) => {
  return (
    <Alert
      message={title}
      description={description}
      showIcon
      type="warning"
      style={{ background: "#915900", ...sharedStyles }}
    />
  );
};

export const InfoToastUi = ({ title, description }: ToastProps) => {
  return (
    <Alert
      message={title}
      description={description}
      showIcon
      type="info"
      style={{ background: "#1b477e", ...sharedStyles }}
    />
  );
};

export const ErrorToastUi = ({ title, description }: ToastProps) => {
  return (
    <Alert
      message={title}
      description={description}
      showIcon
      type="error"
      style={{ background: "#730000", ...sharedStyles }}
    />
  );
};
