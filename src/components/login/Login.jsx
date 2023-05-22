import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActionTypes } from "../../store/auth/authReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  console.log(isAuthorized);

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (name) => {
    return (e) => {
      setFormState((prevState) => ({ ...prevState, [name]: e.target.value }));
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formState.email.includes("@") && formState.password.length > 6) {
      dispatch({
        type: authActionTypes.LOGIN,
        email: formState.email,
        password: formState.password,
      });
      navigate("/todos");
    }
  };

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <AuthForm>
          <label htmlFor="email">Email</label>
          <input
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "12px",
              border: "none",
            }}
            type="email"
            id="email"
            onChange={inputChangeHandler("email")}
            value={formState.email}
          />
        </AuthForm>
        <AuthForm>
          <label htmlFor="password">Password </label>
          <input
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "12px",
              border: "none",
            }}
            type="password"
            id="password"
            onChange={inputChangeHandler("password")}
            value={formState.password}
          />
        </AuthForm>
        <MyButton >Click Me</MyButton>
      </form>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 6rem auto;
  padding: 20px 0;
  border: 1px solid;
  width: 35%;
  height: 200px;
  background-image: url("https://img.freepik.com/free-photo/road-mountains-with-cloudy-sky_1340-23022.jpg");
  border-radius: 15px;
`;

const AuthForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;
const MyButton=styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 12px;
  background-color: blueviolet;
  color: white;
  font-size: 20px;
`