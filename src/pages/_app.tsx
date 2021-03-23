import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  Image,
  Text,
  Flex,
} from "@chakra-ui/core";
import theme from "../theme";
import { Header } from "src/components/general/Header";
import { CTA } from "src/components/general/CTA";
import { Container } from "src/components/general/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext } from "src/context/ModalContext";
import { PoolProvider } from "src/context/PoolContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { useWeb3Presence } from "src/hooks/useWeb3Presence";
import Router from "next/router";

console.log("env: ", process.env.ENV);

function MyApp({ Component, pageProps }) {
  const [changingRoute, setChangingRoute] = useState<boolean>(false);
  const web3Present = useWeb3Presence();

  useEffect(() => {
    const changeStart = () =>
      Router.events.on("routeChangeStart", () => setChangingRoute(true));
    const changeComplete = () =>
      Router.events.on("routeChangeComplete", () => setChangingRoute(false));
    const changeError = () =>
      Router.events.on("routeChangeError", () => setChangingRoute(false));
    changeStart();
    changeComplete();
    changeError();
    return () => {
      changeStart();
      changeComplete();
      changeError();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <PriceFeedProvider>
        <UseWalletProvider
          chainId={Number(process.env.ETHEREUM_CHAIN_ID)}
          connectors={{
            walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          }}
        >
          <PoolProvider>
            <ModalContext>
              <Box>
                {!web3Present ? (
                  <Flex
                    direction="column"
                    alignItems="center"
                    margin="auto"
                    px={8}
                    py={8}
                  >
                    <Image
                      py={4}
                      src="/images/aluna-icon.png"
                      w="32"
                      align="center"
                    />
                    <Heading py={2} px={2} textAlign="center" fontSize="md">
                      It looks like you&apos;re using device without a valid
                      web3 provider.
                    </Heading>
                    <Text py={2} px={2} textAlign="center" fontSize="md">
                      Please switch to a web3 compatible browser to use
                      aluna.social/farm
                    </Text>
                  </Flex>
                ) : (
                  <Container>
                    <Header changingRoute={changingRoute} />

                    <Component {...pageProps} />

                    <CTA />
                  </Container>
                )}
              </Box>
            </ModalContext>
          </PoolProvider>
        </UseWalletProvider>
      </PriceFeedProvider>
      <title>Aluna Social Farm</title>
      <style jsx global>{`
        @font-face {
          font-family: "Formular-Mono";
          src: url("/fonts/Formular-Mono.ttf");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Roboto";
          src: url("/fonts/Roboto/Roboto-Regular.ttf");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: "Roboto-Mono";
          src: url("/fonts/Roboto_Mono/static/RobotoMono-Regular.ttf");
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        body {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </ChakraProvider>
  );
}

export default MyApp;
