import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo-client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            html: {
              overflowX: "hidden",
            },
            body: {
              overflowX: "hidden",
            },
            "#root": {
              width: "100%",
              overflowX: "hidden",
            },
          }}
        />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>
);
