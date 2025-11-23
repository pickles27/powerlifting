import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo-client";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </StrictMode>
);
