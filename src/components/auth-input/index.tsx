import { Input, Typography } from "antd";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { useTranslation } from "next-i18next";

export const AuthInput = ({ control, errors, name }) => {
  const { t } = useTranslation("common");
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { isTouched, error },
      }) => (
        <>
          <Input
            ref={ref}
            status={error && isTouched && "error"}
            size="large"
            value={value}
            placeholder={t(name)}
            onChange={onChange}
            onBlur={onBlur}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => {
              return (
                <Typography style={{ marginBottom: "-22px", color: "#FF0000" }}>
                  {t(message)}
                </Typography>
              );
            }}
          />
        </>
      )}
    />
  );
};
