// React
import React from "react";

// Components
import { StateProvider } from "./store/store";
import StudentContainer from "./components/StudentContainer/StudentContainer";

function App() {
  return (
    <StateProvider>
      <div className="App">
        <StudentContainer />
      </div>
    </StateProvider>
  );
}

export default App;
