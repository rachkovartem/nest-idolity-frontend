import { Button, Card, Input, Space, Typography } from "antd";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../src/api/queries/auth";
import Link from "next/link";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { ErrorMessage } from "@hookform/error-message";
import { AuthInput } from "../../src/components/auth-input";
import i18nMessages from "../../src/shared/config/i18n-messages";
import { userSchema } from "../../src/shared/config/joiValidation";
import { useEffect } from "react";
import { notify } from "../../src/shared/utils/notification/notify";
import { useRouter } from "next/router";
const { Title, Paragraph } = Typography;

type FormValues = {
  name: string;
  email: string;
  password: string;
};

export default function Home() {
  const { t } = useTranslation("common");
  const [CreateUser, { error, loading }] = useMutation(SIGNUP);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: joiResolver(userSchema),
  });

  useEffect(() => {
    if (error) {
      const message = error.message ? t(error.message) : t("smthWrong");
      notify.error({ title: t("error"), description: message });
    }
  }, [error]);

  const onSubmit = async (data) => {
    try {
      const res = await CreateUser({ variables: data });
      if (res.data) {
        await router.push("/");
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
            <Paragraph>{t("createAcc")}</Paragraph>
            <Paragraph>
              <span>{t("or")}</span>
              <Link href="/">{t("signin")}</Link>
              <span>{t("ifAlreadyHave")}</span>
            </Paragraph>
          </Typography>
          <Space
            direction="vertical"
            size={20}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <AuthInput control={control} errors={errors} name="name" />
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
