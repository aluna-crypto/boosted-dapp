import React from "react";
import { useColorMode, Switch } from "@chakra-ui/core";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      justifySelf="center"
      color="purple"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
