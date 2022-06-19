import React, { Component, Fragment } from "react";
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
class Game extends Component {
  render() {
    return (
      <Fragment>
        <Controls />
        <Main />
      </Fragment>
    );
  }
}

export default Game;
