import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "rgba(49, 130, 206, 1)",
      200: "rgba(49, 130, 206, 0.8)",
    },
    error: {
      100: "rgba(245, 101, 101, 1)",
    },
    warning: {
      100: "  rgba(245, 220, 77, 1)",
    },
    info: {
      100: "rgba(101, 177, 245, 1)",
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
  },
});

export default theme;
