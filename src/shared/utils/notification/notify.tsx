import { attach, createEffect, createEvent, sample } from "effector";
import { toast, ToastContent, ToastOptions } from "react-toastify";
import * as React from "react";
import {
  SuccessToastUi,
  WarningToastUi,
  InfoToastUi,
  ErrorToastUi,
} from "./toast-ui";

interface ToastParams extends ToastOptions {
  title?: string;
  description?: string;
}

interface MapToNotifyFxParams {
  title?: string;
  description?: string;
  params?: ToastOptions;
}

type Type = "success" | "warning" | "info" | "error";

interface ToastHandlerParams {
  element: ToastContent;
  type: Type;
  toastId: string;
  onClick?: (event: React.MouseEvent) => void & Omit<ToastOptions, "onClick">;
}

const progressColorSwitcher = (type: Type) => {
  switch (type) {
    case "success":
      return "#2ec309";
    case "warning":
      return "#ff9900";
    case "info":
      return "#3491ff";
    case "error":
      return "#bd0000";
    default:
      return "#000";
  }
};

const notifyFx = createEffect(
  ({ element, type, toastId, onClick, ...params }: ToastHandlerParams) =>
    toast(element, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
      bodyStyle: {
        padding: 0,
      },
      style: {
        cursor: onClick ? "pointer" : "auto",
        padding: 0,
      },
      progressStyle: {
        background: progressColorSwitcher(type),
      },
      toastId,
      onClick,
      ...params,
    })
);

const successNotifyFx = attach({
  effect: notifyFx,
  mapParams: ({ title, description, ...params }: MapToNotifyFxParams) => ({
    element: <SuccessToastUi title={title} description={description} />,
    type: "success" as const,
    toastId: `${title}${description}`,
    ...params,
  }),
});

const warningNotifyFx = attach({
  effect: notifyFx,
  mapParams: ({ title, description, ...params }: MapToNotifyFxParams) => ({
    element: <WarningToastUi title={title} description={description} />,
    type: "warning" as const,
    toastId: `${title}${description}`,
    ...params,
  }),
});

const infoNotifyFx = attach({
  effect: notifyFx,
  mapParams: ({ title, description, ...params }: MapToNotifyFxParams) => ({
    element: <InfoToastUi title={title} description={description} />,
    type: "info" as const,
    toastId: `${title}${description}`,
    ...params,
  }),
});

const errorNotifyFx = attach({
  effect: notifyFx,
  mapParams: ({ title, description, ...params }: MapToNotifyFxParams) => ({
    element: <ErrorToastUi title={title} description={description} />,
    type: "error" as const,
    toastId: `${title}${description}`,
    ...params,
  }),
});

const notifySuccess = createEvent<ToastParams>();
const notifyWarning = createEvent<ToastParams>();
const notifyInfo = createEvent<ToastParams>();
const notifyError = createEvent<ToastParams>();

sample({
  clock: notifySuccess,
  target: successNotifyFx,
});

sample({
  clock: notifyWarning,
  target: warningNotifyFx,
});

sample({
  clock: notifyInfo,
  target: infoNotifyFx,
});

sample({
  clock: notifyError,
  target: errorNotifyFx,
});

export const notify = {
  success: notifySuccess,
  warning: notifyWarning,
  info: notifyInfo,
  error: notifyError,
};
