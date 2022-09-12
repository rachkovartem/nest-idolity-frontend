import { Card, Layout } from "antd";
const { Header, Content: AntdContent, Footer, Sider } = Layout;

export const Content = ({ children }: { children: JSX.Element }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <AntdContent style={{ padding: "15px" }}>{children}</AntdContent>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
