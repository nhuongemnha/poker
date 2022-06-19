import React from "react";
import { useSelector } from "react-redux"; // lấy dữ liệu từ store về
import Player from "../Player";

const MainComponent = () => {
  const players = useSelector((state) => {
    return state.player.playerList;
  });

  return (
    <div
      style={{ position: "relative", height: "600px" }}
      className="container"
    >
      {players.map((item, index) => {
        return <Player key={item.username} player={item} index={index + 1} />;
      })}

   

      <img
        alt="main"
        style={{
          position: "absolute",
          width: "100px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        src="https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png"
      />
    </div>
  );
};

export default MainComponent;
