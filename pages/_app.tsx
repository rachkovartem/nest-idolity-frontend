import "../src/styles/fonts.css";
import "../src/styles/antd/index.less";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../src/api/apollo-client";
import { fork, Scope, serialize } from "effector";
import { Provider as EffectorProvider } from "effector-react/scope";
import { ToastContainer } from "react-toastify";
import { CloseToastButton } from "../src/shared/utils/notification/toast-ui";
import "src/styles/toastify.scss";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

let clientScope: Scope;

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const scope = fork({
    values: {
      ...(clientScope && serialize(clientScope)),
      ...pageProps.initialState,
    },
  });

  if (typeof window !== "undefined") clientScope = scope;

  return (
    <EffectorProvider value={scope}>
      <ApolloProvider client={apolloClient}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
      <ToastContainer
        limit={3}
        closeButton={CloseToastButton}
        style={{ margin: 0 }}
      />
    </EffectorProvider>
  );
}

export default appWithTranslation(App);
