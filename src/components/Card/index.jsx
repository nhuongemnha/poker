import React from "react";
import { useSelector } from "react-redux";
import "./card.css";
//
const Card = (props) => {
  const isRevealed = useSelector((state) => {
    return state.status.isRevealed;
  });
  return (
    <div>
      <img
        alt="card"
        className="card"
        src={
          isRevealed
            ? props.card.image
            : "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png"
        }
      />
    </div>
  );
};

export default Card;
