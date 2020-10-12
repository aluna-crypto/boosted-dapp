import theme from "@chakra-ui/theme";
import React from 'React';

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
    mono: "Roboto",
  },
  breakpoints,
  icons: {
    logo: {
      // path: (<path d="..."/>) => string
    }
  }
};

customTheme.colors.purple['200'] = '#7547dc'
customTheme.colors.purple['300'] = '#ccff00'

console.log("customTheme ->", customTheme)
export default customTheme;
