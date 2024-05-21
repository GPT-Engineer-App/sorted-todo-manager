import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({
  colors: {
    ...colors,
    pink: {
      50: "#ffe4e6",
      100: "#ffccd5",
      200: "#ff99aa",
      300: "#ff6680",
      400: "#ff3366",
      500: "#ff004d",
      600: "#cc003e",
      700: "#99002e",
      800: "#66001f",
      900: "#33000f",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
