import { AppProps } from "next/app";
import { Layout } from "antd";
const { Header, Content: AntdContent, Footer } = Layout;

export const Content = ({ children }: { children: JSX.Element }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>Header</Header>
      <AntdContent style={{ padding: "15px" }}>{children}</AntdContent>
      <Footer>Footer</Footer>
    </Layout>
  );
};
