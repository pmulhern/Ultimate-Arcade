import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Scene1 from "./phaser/Scene1";
import Scene2 from "./phaser/Scene2.js";

//console.log(App);

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 756,
  height: 772,
  backgrounColor: 0x00000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false
    }
  }
};

const game = new Phaser.Game(config);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
