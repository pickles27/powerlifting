import { useQuery } from "@apollo/client/react";
import { GET_LEADERBOARD } from "../graphql/queries";
import type { LeaderboardData, Sex, Equipment, Event } from "../types";

interface LeaderboardFilters {
  sex?: Sex;
  equipment?: Equipment;
  weightClass?: string;
  event?: Event;
  federation?: string;
  sortBy?: "DOTS" | "WILKS" | "TOTAL" | "GLOSSBRENNER" | "GOODLIFT";
  limit?: number;
}

export function Leaderboard({
  filters = {},
}: {
  filters?: LeaderboardFilters;
}) {
  const { loading, error, data } = useQuery<LeaderboardData>(GET_LEADERBOARD, {
    variables: {
      sex: filters.sex,
      equipment: filters.equipment,
      weightClass: filters.weightClass,
      event: filters.event,
      federation: filters.federation,
      sortBy: filters.sortBy || "DOTS",
      limit: filters.limit || 100,
    },
  });

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Sex</th>
            <th>Weight Class</th>
            <th>Squat</th>
            <th>Bench</th>
            <th>Deadlift</th>
            <th>Total</th>
            <th>Dots</th>
            <th>Meet</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.leaderboard.map((lift, index) => (
            <tr key={lift.id}>
              <td>{index + 1}</td>
              <td>{lift.name}</td>
              <td>{lift.sex}</td>
              <td>{lift.weightClassKg}</td>
              <td>{lift.best3SquatKg?.toFixed(1) || "-"}</td>
              <td>{lift.best3BenchKg?.toFixed(1) || "-"}</td>
              <td>{lift.best3DeadliftKg?.toFixed(1) || "-"}</td>
              <td>{lift.totalKg?.toFixed(1)}</td>
              <td>{lift.dots?.toFixed(2)}</td>
              <td>{lift.meetName}</td>
              <td>{lift.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
