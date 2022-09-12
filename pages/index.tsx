import { Button, Card, Space, Typography } from "antd";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
const { Title, Paragraph } = Typography;
import { LOGIN } from "../src/api/queries/auth";
import Link from "next/link";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSchema } from "../src/shared/config/joiValidation";
import { AuthInput } from "../src/components/auth-input";
import { notify } from "../src/shared/utils/notification/notify";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
};

const userSchemaWithoutPass = userSchema.fork(["name"], (schema) =>
  schema.optional()
);

export default function Home() {
  const { t } = useTranslation("common");
  const [Login, { loading, error }] = useLazyQuery(LOGIN);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(userSchemaWithoutPass),
  });

  useEffect(() => {
    if (error) {
      const message =
        error.message === "Unauthorized"
          ? t("noUserOrWrongPassword")
          : error.message
          ? t(error.message)
          : t("smthWrong");
      notify.error({ title: t("error"), description: message });
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      const res = await Login({
        variables: {
          email: data.email.toLowerCase(),
          password: data.password,
        },
      });
      if (res.data) {
        notify.success({ title: "Успешно" });
      }
    } catch (error) {
      notify.error({
        title: t("error"),
        description: t("smthWrong"),
      });
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
            <Paragraph>
              <span>{t("loginOr")}</span>
              <Link href="/signup">{t("create")}</Link>
              <span>{t("ifNotYet")}</span>
            </Paragraph>
          </Typography>
          <Space
            direction="vertical"
            size={20}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <AuthInput control={control} errors={errors} name="email" />
            <AuthInput control={control} errors={errors} name="password" />
            <Button
              loading={loading}
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ width: "100%", marginTop: "50px" }}
            >
              {t("login")}
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
    },
  };
}
