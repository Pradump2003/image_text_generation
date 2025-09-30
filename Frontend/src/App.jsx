import { useState } from "react";
import "./App.css";
import TextWorkFlow from "./components/TextWorkFlow";
import ImageWorkFlow from "./components/ImageWorkFlow";

function App() {
  const [tab, setTab] = useState("text")
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Tool</h1>
      <button onClick={() => setTab("text")}>Text Workflow</button>
      <button onClick={() => setTab("image")}>Image Workflow</button>

      {tab === "text" ? <TextWorkFlow /> : <ImageWorkFlow />}
    </div>
  );
}

export default App;
