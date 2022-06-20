import React, { Fragment, useEffect, useState, memo, useCallback } from "react";
import "./index.css";
import Controls from "../../components/Control";
import Main from "../../components/Main";
import axios from "axios";
import { useDispatch } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();

  const fetchNewDeckCard = useCallback(async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://deckofcardsapi.com/api/deck/new/",
      });
      localStorage.setItem("deck_id", res.data.deck_id);
      dispatch({ type: "SET_DECK_CARD", payload: res.data });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  const reShuffleCards = useCallback(
    async (id) => {
      try {
        const res = await axios({
          method: "GET",
          url: `https://deckofcardsapi.com/api/deck/${id}/shuffle/`,
        });
        console.log(res);
        dispatch({ type: "SET_DECK_CARD", payload: res.data });
      } catch (err) {
        console.log(err);
      }
    },
    [dispatch]
  );

  // DidMount, didUpdate, willMount
  useEffect(() => {
    // call api:  kiểm tra nếu đã có bộ bài rồi
    // thì sẽ không lấy bộ bài mới, mà chỉ xáo bộ bài hiện tại
    const deckId = localStorage.getItem("deck_id");
    if (deckId) {
      reShuffleCards(deckId);
    } else fetchNewDeckCard();
  }, []);
  // useEffect(() => {
  //   console.log("useEffect Run when count change!!!");
  // },[count]);
  // useEffect(() => {
  //   console.log("useEffect Run!!!");
  // });
  return (
    <Fragment>
      <Controls />
      <Main />
    </Fragment>
  );
};

export default memo(Game);
