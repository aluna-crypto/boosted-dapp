import React, { useCallback, useEffect } from "react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/core";
import theme from "../theme";
import { MarqueeComponent } from "src/components/Marquee";
import { Header } from "src/components/Header";
import { NewsBlock } from "src/components/NewsBlock";
import { Footer } from "src/components/Footer";
import { CTA } from "src/components/CTA";
import { Container } from "src/components/Container";
import { UseWalletProvider } from "use-wallet";
import { ModalContext, useModal } from "src/context/ModalContext";
import { PoolProvider } from "src/context/PoolContext";
import { PriceFeedProvider } from "src/context/PriceFeedContext";
import { DisclaimerModal } from "src/components/DisclaimerModal";

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem("disclaimer", "seen");
  }, []);

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />
  );

  useEffect(() => {
    const seenDisclaimer = localStorage.getItem("disclaimer");
    seenDisclaimer;
    // if (!seenDisclaimer) {
    //   onPresentDisclaimerModal();
    // }
  }, [onPresentDisclaimerModal]);

  return <div />;
};

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <PriceFeedProvider>
        <UseWalletProvider
          chainId={1}
          connectors={{
            walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
          }}
        >
          <PoolProvider>
            <ModalContext>
              <Disclaimer />
              <Box>
                <MarqueeComponent />
                <Container>
                  <Header />
                  <NewsBlock />
                  <Component {...pageProps} />
                  <Footer />
                  <CTA />
                </Container>
              </Box>
            </ModalContext>
          </PoolProvider>
        </UseWalletProvider>
      </PriceFeedProvider>
      <title>Boosted Finance</title>
      <style jsx global>{`
        @font-face {
          font-family: "Formular-Mono";
          src: url("/fonts/Formular-Mono.ttf");
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
