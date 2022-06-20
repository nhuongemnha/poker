import React, { useState } from "react";
import Game from "../Game";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

const schema = yup.object().shape({
  username: yup.string().required("User is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]+$/g, "phone must be a number"), // Buổi 12: 1 tiếng 26 phút
});

// let timer = null;

const Home = () => {
  // useState : tạo State
  const [isGameStarted, setIsGameStarted] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
    },
    validationSchema: schema,
    validateOnMount: true,
  });

  const handleSetDefaultPlayer = () => {
    const defaultPlayer = {
      username: "phat",
      email: "phatnguyentien@gmail.com",
      phone: "1231231231",
    };
    formik.setValues({
      username: defaultPlayer.username,
      email: defaultPlayer.email,
      phone: defaultPlayer.phone,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.setTouched({
      username: true,
      email: true,
      phone: true,
    });
    if (!formik.isValid) return;

    console.log(formik.values);

    // dispatch action lên store, lưu info vào playerList
    dispatch({
      type: "ADD_PlAYER",
      payload: { ...formik.values, totalPoint: 25000, cards: [] },
    });
    setIsGameStarted(true);
  };

  // debounce
  // const handleTest = () => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(() => {
  //     console.log("test");
  //   }, 500);
  // };

  return (
    <>
      {isGameStarted ? (
        <Game />
      ) : (
        <div
          className="text-center"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="display-4 mb-5"> Welcome to Pocker Center</h1>
          <h3>Fill your info and start</h3>
          <form onSubmit={handleSubmit} className="w-25 mx-auto">
            {/* <input
              placeholder="test"
              onChange={handleTest}
              className="w-100 form-control mb-3"
            /> */}
            <input
              value={formik.values.username}
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // clip 12 : 1:43:53
              type="input"
              placeholder="username"
              className="w-100 form-control mb-3"
            />
            {formik.touched.username && (
              <p className="text-danger">{formik.errors.username}</p>
            )}

            <input
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // clip 12 : 1:43:53
              type="input"
              placeholder="email"
              className="w-100 form-control mb-3"
            />
            {formik.touched.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}

            <input
              value={formik.values.phone}
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} // clip 12 : 1:43:53
              type="input"
              placeholder="phone"
              className="w-100 form-control mb-3"
            />
            {formik.touched.phone && (
              <p className="text-danger">{formik.errors.phone}</p>
            )}

            <button className="btn btn-success">Start new Game</button>
            <button
              onClick={handleSetDefaultPlayer}
              type="button"
              className="btn btn-info"
            >
              Set Default player
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
