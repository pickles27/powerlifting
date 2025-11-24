import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { SBDByBodyweightChart } from "./SBDByBodyweightChart";
import { useSbdByBodyweightQuery } from "../../../__generated__/graphql";

export const SBDByBodyweightChartSection = () => {
  const { data, loading, error } = useSbdByBodyweightQuery({
    variables: { limit: 3000 },
  });
  const lifts = data?.sbdByBodyweight || [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (lifts.length === 0 || error || !data) {
    return <Box>No data available</Box>;
  }

  return (
    <Box component="section" width="100%">
      {lifts && <SBDByBodyweightChart lifts={lifts} />}
    </Box>
  );
};
