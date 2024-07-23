import React, { Profiler } from "react";
import "./App.css";

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
  console.log("Profiler ID:", id);
  console.log("Phase:", phase);
  console.log("Actual Duration:", actualDuration);
  console.log("Base Duration:", baseDuration);
  console.log("Start Time:", startTime);
  console.log("Commit Time:", commitTime);
  console.log("Interactions:", interactions);
};

const ExpensiveComponent = () => {
  let now = performance.now();
  while (performance.now() - now < 20) {
    // Intentional delay for demo purposes
  }
  return <div>Expensive Component</div>;
};

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <div className="App">
        <header className="App-header">
          <h1>React Profiler Example</h1>
          <ExpensiveComponent />
        </header>
      </div>
    </Profiler>
  );
}

export default App;
