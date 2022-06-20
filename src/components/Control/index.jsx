import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useCallback } from "react";

const Control = () => {
  const players = useSelector((state) => {
    return state.player.playerList;
  });

  const deckCard = useSelector((state) => {
    return state.card.deckCard;
  });

  const dispatch = useDispatch();

  const handleDrawCards = useCallback(async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://deckofcardsapi.com/api/deck/${deckCard.deck_id}/draw/?count=12`,
      });
      // chia bài cho 4 player
      const clonePlayers = [...players];
      // dispatch action gửi nguyên playerList mới lên store để cập nhật

      for (let i in res.data.cards) {
        const playerIndex = i % clonePlayers.length;
        clonePlayers[playerIndex].cards.push(res.data.cards[i]);

        // i = 0 => playerIndex = 0
        // i = 1 => playerIndex = 1
        // i = 2 => playerIndex = 2
        // i = 3 => playerIndex = 3
        // i = 4 => playerIndex = 0
        // i = 5 => playerIndex = 1
      }
      dispatch({ type: "SET_PLAYER", payload: clonePlayers });
    } catch (err) {
      console.log(err);
    }
  }, [deckCard, dispatch, players]);

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button onClick={handleDrawCards} className="btn btn-info mr-2">
          Draw
        </button>
        <button className="btn btn-primary mr-2">Reveal</button>
      </div>
      <div className="d-flex">
        {players.map((item) => {
          return (
            <div key={item.username} className="border px-3 text-center">
              <p>{item.username}</p>
              <p> {item.totalPoint}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Control;
