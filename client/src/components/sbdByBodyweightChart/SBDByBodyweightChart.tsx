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
import { valueExists } from "../../utils/valueExists";
import type { ScatterValueType } from "@mui/x-charts";
import type { SbdDataPoint } from "../../__generated__/graphql";

export const SBDByBodyweightChart = ({ lifts }: { lifts: SbdDataPoint[] }) => {
  const scatterChartsParams = {
    series: [
      {
        id: "bench",
        data: lifts
          .filter(
            (lift) =>
              valueExists(lift.best3BenchKg) && valueExists(lift.bodyweightKg)
          )
          .map((lift) => ({
            x: lift.bodyweightKg,
            y: lift.best3BenchKg,
          })) as ScatterValueType[],
        markerSize: 1,
        label: "Bench Press",
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        id: "squat",
        data: lifts
          .filter(
            (lift) =>
              valueExists(lift.best3SquatKg) && valueExists(lift.bodyweightKg)
          )
          .map((lift) => ({
            x: lift.bodyweightKg,
            y: lift.best3SquatKg,
          })) as ScatterValueType[],
        markerSize: 1,
        label: "Squat",
        highlightScope: {
          highlight: "series",
          fade: "global",
        },
      },
      {
        id: "deadlift",
        data: lifts
          .filter(
            (lift) =>
              valueExists(lift.best3DeadliftKg) &&
              valueExists(lift.bodyweightKg)
          )
          .map((lift) => ({
            x: lift.bodyweightKg,
            y: lift.best3DeadliftKg,
          })) as ScatterValueType[],
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
    // colors: schemePaired,
    slotProps: {
      legend: {
        position: { vertical: "bottom" },
        sx: { justifyContent: "center" },
      },
    },
    slots: {
      tooltip: LiftTooltip,
    },
  } satisfies ScatterChartProps;

  return <ScatterChart {...scatterChartsParams} renderer="svg-batch" />;
};

function LiftTooltip() {
  return (
    <ChartsTooltipContainer trigger="item">
      <LiftTooltipContent />
    </ChartsTooltipContainer>
  );
}

function LiftTooltipContent() {
  const item = useItemTooltip<"scatter">();

  if (!item) {
    return null;
  }

  return (
    <Paper sx={{ p: 1.5 }} elevation={4}>
      <Typography
        variant="subtitle2"
        justifyContent={"space-between"}
        display="flex"
      >
        {item.label}
      </Typography>
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
}
