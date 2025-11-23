import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { SBDByBodyweightChartSection } from "./components/sbdByBodyweightChart/SBDByBodyweightChartSection";

function App() {
  return (
    <Container component="main" maxWidth="sm" sx={{ my: 4, width: "100%" }}>
      <Typography variant="h1" sx={{ textAlign: "center" }}>
        Powerlifting Insights
      </Typography>
      <Stack component="main" my={4} gap={6} alignItems="center">
        <SBDByBodyweightChartSection />
      </Stack>
    </Container>
  );
}

export default App;
