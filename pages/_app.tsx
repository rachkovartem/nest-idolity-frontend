import "../src/styles/fonts.css";
import "../src/styles/antd/index.less";
import { AppProps } from "next/app";
import { Content } from "../src/layouts/content";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../src/api/apollo-client";

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Content>
        <Component {...pageProps} />
      </Content>
    </ApolloProvider>
  );
}

export default appWithTranslation(App);
