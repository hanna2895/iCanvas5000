import "./firebase";
import CanvasList from "./components/canvasList";
import { useState } from "react";
import AddVoter from "./components/addVoter";

function App() {
  const [showAddVoter, setShowAddVoter] = useState(false);
  return (
    <div className="App">
      <nav>
        iCanvas5000{" "}
        <button onClick={() => setShowAddVoter(true)}>Add Voter</button>
      </nav>
      {showAddVoter && <AddVoter />}
      <CanvasList />
    </div>
  );
}

export default App;
