import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Scene1 from "./components/Scene1";
import Scene2 from "./components/Scene2.js";
import registerServiceWorker from "./registerServiceWorker";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1280,
  height: 720,
  backgrounColor: 0x00000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false,
        debugShowVelocity: false
    }
  }
};

export const game = new Phaser.Game(config);

ReactDOM.render(
<App />, 
document.getElementById("root") || document.createElement("div"));
registerServiceWorker();
