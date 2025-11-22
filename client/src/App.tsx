import "./App.css";
import { Leaderboard } from "./components/Leaderboard";

function App() {
  return (
    <div className="App">
      <h1>Powerlifting Analytics</h1>
      <Leaderboard
        filters={{
          sex: "M",
          equipment: "Raw",
          event: "SBD",
          sortBy: "DOTS",
          limit: 50,
        }}
      />
    </div>
  );
}

export default App;
