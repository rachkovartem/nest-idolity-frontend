import { Button, Card, ConfigProvider, Input, Space, Typography } from "antd";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../src/api/queries/auth";
const { Title, Paragraph } = Typography;

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { t } = useTranslation("common");
  const [CreateUser, { data, loading, error }] = useMutation(LOGIN);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await CreateUser({ variables: data });
    } catch {
      alert("kek");
    }
  };

  return (
    <>
      <Head>
        <title>Idolity</title>
        <meta name="description" content="Добро пожаловать в Idolity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <Card bordered={false}>
          <Typography>
            <Title>{t("welcome")}</Title>
            <Paragraph>{t("createAcc")}</Paragraph>
          </Typography>
          <Space
            direction="vertical"
            size={20}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <Controller
              control={control}
              name="name"
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { isTouched, error },
              }) => (
                <Input
                  ref={ref}
                  status={error && isTouched && "error"}
                  size="large"
                  value={value}
                  placeholder={t("name")}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <Input
                  ref={ref}
                  status={error && "error"}
                  size="large"
                  value={value}
                  placeholder={t("email")}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{
                required: true,
              }}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <Input
                  ref={ref}
                  status={error && "error"}
                  size="large"
                  value={value}
                  placeholder={t("password")}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ width: "100%", marginTop: "50px" }}
            >
              {t("register")}
            </Button>
          </Space>
        </Card>
      </form>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
