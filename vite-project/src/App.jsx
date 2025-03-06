import React from "react";
import SmartLamp from "./components/Smartlamp";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  return (
    <div>
      <h1>Smart Home</h1>
      <SmartLamp />
      <MusicPlayer />
    </div>
  );
};

export default App;
