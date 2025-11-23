import { Box } from "@mui/material";
import { SBDByBodyweightChart } from "./SBDByBodyweightChart";
import { useSbdByBodyweightQuery } from "../../__generated__/graphql";

export const SBDByBodyweightChartSection = () => {
  const { data } = useSbdByBodyweightQuery({
    variables: { limit: 2000 },
  });
  const lifts = data?.sbdByBodyweight || [];

  if (lifts.length === 0) {
    return <Box>No data available</Box>;
  }

  return (
    <Box component="section" width="100%">
      {lifts && <SBDByBodyweightChart lifts={lifts} />}
    </Box>
  );
};
