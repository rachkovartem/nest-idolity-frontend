import "../src/styles/fonts.css";
import "../src/styles/antd/index.less";
import { AppProps } from "next/app";
import { Content } from "../src/layouts/content";

function App({ Component, pageProps }: AppProps) {
  return (
    <Content>
      <Component {...pageProps} />
    </Content>
  );
}

export default App;
