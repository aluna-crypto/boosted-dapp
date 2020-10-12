import React from "react";
import { Flex, useColorMode } from "@chakra-ui/core";

export const Container = (props) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "black" };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      maxWidth="1200px"
      margin="auto"
      px={8}
      bgColor={bgColor[colorMode]}
      {...props}
    />
  );
};
