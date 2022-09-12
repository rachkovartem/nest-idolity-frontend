import { Button, Card, ConfigProvider, Input, Space, Typography } from "antd";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
const { Title, Paragraph } = Typography;
import { LOGIN } from "../src/api/queries/auth";
import Link from "next/link";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { userSchema } from "../src/shared/config/joiValidation";
import { AuthInput } from "../src/components/auth-input";

type FormValues = {
  email: string;
  password: string;
};

const userSchemaWithoutPass = userSchema.fork(["password"], (schema) =>
  schema.optional()
);

export default function Home() {
  const { t } = useTranslation("common");
  const [Login, { data, loading, error }] = useLazyQuery(LOGIN);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(userSchemaWithoutPass),
  });

  const onSubmit = async (data) => {
    try {
      await Login({ variables: data });
    } catch (error) {
      console.log(error);
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
      // Will be passed to the page component as props
    },
  };
}
