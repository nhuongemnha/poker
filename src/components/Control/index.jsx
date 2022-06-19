import React from "react";

const control = () => {
  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button className="btn btn-info mr-2">Draw</button>
        <button className="btn btn-primary mr-2">Reveal</button>
      </div>
      <div className="d-flex">
        <div className="border px-3 text-center">
          <p>Player 1</p>
          <p> 0 </p>
        </div>
        <div className="border px-3 text-center">
          <p>Player 2</p>
          <p> 0 </p>
        </div>
        <div className="border px-3 text-center">
          <p>Player 3</p>
          <p> 0 </p>
        </div>
        <div className="border px-3 text-center">
          <p> Tên mình </p>
          <p> 0 </p>
        </div>
      </div>
    </div>
  );
};

export default control;
