import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "rgba(49, 130, 206, 1)",
      200: "rgba(49, 130, 206, 0.8)",
    },
  },
});

export default theme;
