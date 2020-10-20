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
    black: "#1d1d1c",
  },
  fonts: {
    ...theme.fonts,
    body: "Roboto",
    heading: "Roboto",
    mono: "Roboto-Mono",
  },
  breakpoints,
  icons: {
    logo: {
      // path: (<path d="..."/>) => string
    },
  },
};

customTheme.colors.purple["200"] = "#7547dc";
customTheme.colors.gray["800"] = customTheme.colors.black;
customTheme.colors.yellow["500"] = "#f5be23";
customTheme.colors.green["200"] = "#1fc16d";
customTheme.colors.red["200"] = "#f34a34";

// uncomment to see everything from the theme
// console.log("customTheme ->", customTheme)

export default customTheme;
