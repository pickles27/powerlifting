import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  ChartsTooltipContainer,
  useItemTooltip,
} from "@mui/x-charts/ChartsTooltip";
import {
  ScatterChart,
  type ScatterChartProps,
} from "@mui/x-charts/ScatterChart";
import { valueExists } from "../../../utils/valueExists";
import { rainbowSurgePalette, type ScatterValueType } from "@mui/x-charts";
import type { SbdDataPoint } from "../../../__generated__/graphql";
import Stack from "@mui/material/Stack";
import { useMemo } from "react";

export const SBDByBodyweightChart = ({ lifts }: { lifts: SbdDataPoint[] }) => {
  const scatterChartsParams = useMemo(
    () =>
      ({
        series: [
          {
            id: "bench",
            data: getLiftData(lifts, "best3BenchKg"),
            markerSize: 1,
            label: "Bench Press",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
          {
            id: "squat",
            data: getLiftData(lifts, "best3SquatKg"),
            markerSize: 1,
            label: "Squat",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
          {
            id: "deadlift",
            data: getLiftData(lifts, "best3DeadliftKg"),
            markerSize: 1,
            label: "Deadlift",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
        ],
        xAxis: [{ min: 20, label: "Body Weight (kg)" }],
        yAxis: [{ min: 0, width: 60, label: "Amount Lifted (kg)" }],
        height: 400,
        colors: rainbowSurgePalette,
        slotProps: {
          legend: {
            position: { vertical: "bottom" },
            sx: { justifyContent: "center" },
          },
        },
        slots: {
          tooltip: LiftTooltip,
        },
      } satisfies ScatterChartProps),
    [lifts]
  );

  return <ScatterChart {...scatterChartsParams} renderer="svg-batch" />;
};

const LiftTooltip = () => {
  return (
    <ChartsTooltipContainer trigger="item">
      <LiftTooltipContent />
    </ChartsTooltipContainer>
  );
};

const LiftTooltipContent = () => {
  const item = useItemTooltip<"scatter">();

  if (!item) {
    return null;
  }

  return (
    <Paper sx={{ p: 1.5 }} elevation={4}>
      <Stack spacing={1}>
        <Typography
          variant="subtitle2"
          justifyContent={"space-between"}
          display="flex"
        >
          {item.label}
        </Typography>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography variant="body1">
        Bodyweight:{" "}
        <Typography component="span" variant="body2">
          {item.value.x.toFixed(1)} kg
        </Typography>
      </Typography>
      <Typography variant="body1">
        Amount Lifted:{" "}
        <Typography component="span" variant="body2">
          {item.value.y.toFixed(1)} kg
        </Typography>
      </Typography>
    </Paper>
  );
};

const getLiftData = (
  lifts: SbdDataPoint[],
  liftKey: "best3BenchKg" | "best3SquatKg" | "best3DeadliftKg"
) => {
  return lifts
    .filter(
      (lift) => valueExists(lift[liftKey]) && valueExists(lift.bodyweightKg)
    )
    .map((lift) => ({
      x: lift.bodyweightKg as number,
      y: lift[liftKey] as number,
    })) as ScatterValueType[];
};
