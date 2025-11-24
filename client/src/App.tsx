import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { SBDByBodyweightChartSection } from "./components/charts/sbdByBodyweight/SBDByBodyweightChartSection";
import { useColorScheme } from "@mui/material/styles";
import { DarkModeToggle } from "./components/DarkModeToggle";
import Link from "@mui/material/Link";

function App() {
  const { mode } = useColorScheme();

  // Prevent hydration mismatch
  if (!mode) {
    return null;
  }

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        py: {
          xs: 6,
          sm: 8,
          md: 10,
        },
        width: "100%",
        position: "relative",
      }}
    >
      <DarkModeToggle sx={{ position: "absolute", top: 12, right: 8 }} />
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
          fontSize: {
            xs: "3rem",
            sm: "3.5rem",
            md: "4rem",
          },
        }}
      >
        Powerlifting Insights
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          my: 2,
          color: "text.secondary",
          fontSize: {
            xs: "0.875rem",
            sm: "1rem",
          },
        }}
      >
        Data from the{" "}
        <Link
          href="https://www.openpowerlifting.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenPowerlifting project
        </Link>
        .
      </Typography>
      <Stack component="main" my={4} gap={6} alignItems="center">
        <SBDByBodyweightChartSection />
      </Stack>
    </Container>
  );
}

export default App;
