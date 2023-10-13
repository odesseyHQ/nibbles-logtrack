import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/themes/themes.ts";
// Supports weights 100-900
import "@fontsource-variable/montserrat";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
);
