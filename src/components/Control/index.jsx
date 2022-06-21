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
      console.log(clonePlayers);
      dispatch({ type: "SET_PLAYER", payload: clonePlayers });
    } catch (err) {
      console.log(err);
    }
  }, [deckCard, dispatch, players]);

  const checkSpecialCases = useCallback((cards) => {
    // input: Mảng lá bài
    // Kiểm tra mảng bài có 3 lá đều là KING JACK QUEEN
    for (let card of cards) {
      if (!["KING", "JACK", "QUEEN"].includes(card.value)) {
        return false;
      }
    }
    return true;
    // output: bool true/false
  }, []);
  const convertCardValue = useCallback((value) => {
    // input: giá trị của card
    if (["KING", "JACK", "QUEEN"].includes(value)) {
      return 10;
    }
    if (value === "ACE") return 1;
    // output:
    return +value;
    // number => number
    // KING JACK QUEEN => 10
    // ACE => F1
  }, []);
  const handleRevealCards = useCallback(() => {
    dispatch({ type: "SET_REVEALED", payload: true });
    let winners = [];
    const clonePlayers = [...players];
    // kiểm tra trường hợp đặc biệt: duyệt mảng clonePlayers, kiểm tra player nào
    // có cả 3 lá đều là KING,JACK,QUEEN
    for (let player of clonePlayers) {
      if (checkSpecialCases(player.cards)) {
        winners.push(player.username);
      }
    }
    // Nếu ko có TH đặc biệt
    // Cộng điểm cho tất cả người chơi tìm người cao điểm nhất
    let maxPoint = 0;

    if (!winners.length) {
      for (let player of clonePlayers) {
        const point =
          player.cards.reduce((sum, item) => {
            return sum + convertCardValue(item.value);
          }, 0) % 10;
        console.log(point, player.username);
        if (point > maxPoint) {
          maxPoint = point;
          winners = [player.username];
        } else if (point === maxPoint) {
          winners.push(player.username);
        }
        console.log(winners);
      }
    }

    // Cập nhật danh sách player
    alert(winners);
    for (let player of clonePlayers) {
      if (winners.includes(player.username)) {
        player.totalPoint += 20000 / winners.length - 5000;
      } else {
        player.totalPoint -= 5000;
      }
    }
    // dispatch action lên store, gửi nguyên list players mới lên để cặp nhật
    dispatch({ type: "SET_PLAYER", payload: clonePlayers });
  }, [dispatch, players, checkSpecialCases, convertCardValue]);

  return (
    <div className="d-flex  justify-content-end container">
      <div className="border d-flex justify-content-center align-items-center px-2">
        <button className="btn btn-success mr-2">Shuffle</button>
        <button onClick={handleDrawCards} className="btn btn-info mr-2">
          Draw
        </button>
        <button onClick={handleRevealCards} className="btn btn-primary mr-2">
          Reveal
        </button>
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
