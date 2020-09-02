import theme from "@chakra-ui/theme";

const breakpoints = ["40em", "52em", "64em"];

const customTheme = {
  ...theme,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
  colors: {
    ...theme.colors,
    black: "#1A202C",
  },
  fonts: {
    ...theme.fonts,
    body: "Formular-Mono",
    heading: "Formular-Mono",
    mono: "Formular-Mono",
  },
  breakpoints,
};

export default customTheme;
