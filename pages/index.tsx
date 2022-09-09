import { Button, Card, ConfigProvider, Input, Space, Typography } from "antd";
import Head from "next/head";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Idolity</title>
        <meta name="description" content="Добро пожаловать в Idolity" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "150px",
        }}
      >
        <Card bordered={false}>
          <Typography>
            <Title>Добро пожаловать в Idolity</Title>
            <Paragraph>
              Создайте аккаунт чтобы поддержать любимых авторов
            </Paragraph>
          </Typography>
          <Space
            direction="vertical"
            size={20}
            style={{ width: "100%", marginTop: "20px" }}
          >
            <Input size="large" placeholder="Name" />
            <Input size="large" placeholder="Email" />
            <Input size="large" placeholder="Password" />
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{ width: "100%" }}
            >
              Зарегистрироваться
            </Button>
          </Space>
        </Card>
      </div>
    </>
  );
}
