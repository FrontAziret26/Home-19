import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActionTypes } from "../../store/auth/authReducer";
import { todoActionTypes } from "../../store/todo/todoReducer";
import TodoList from "../todo-list/TodoList";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoForm = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo);

  const changeInputHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch({ type: todoActionTypes.ADD_TODO, payload: value });
    setValue("");
  };

  const removeAllTodo = () => {
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
  };

  const logoutHandler = () => {
    dispatch({ type: authActionTypes.LOGOUT });
    dispatch({ type: todoActionTypes.DELETE_ALL_TODO });
    navigate("/login");
  };

  console.log(todo.todo);

  return (
    <>
      <LogoutButton onClick={logoutHandler}>logout</LogoutButton>
      <Container>
        <WrapperBlock>
          <Form>
            <input style={{cursor:"pointer"}} type="text" value={value} onChange={changeInputHandler} />
            <button style={{width:"100px",height:'41px',fontSize:"18px"}} onClick={submitHandler} disabled={!value}>
              Add
            </button>
            <Button
              variant="contained"
              color="error"
              onClick={removeAllTodo}
              startIcon={<DeleteIcon />}
            >
              Delete All
            </Button>
          </Form>
          <ul>
            {todo.todos.map((item) => (
              <ContainerBlock>
                <TodoList key={item.id} todo={item} />
              </ContainerBlock>
            ))}
          </ul>
        </WrapperBlock>
      </Container>
    </>
  );
};

export default TodoForm;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ContainerBlock = styled.div`
  width: 350px;
  height: 70px;
  border-radius: 12px;
  background-color: blueviolet;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperBlock = styled.div`
  width: 500px;
  height: auto;
  background-color: red;
  border-radius: 20px;
`;
const Form = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 70px;
  margin-top: 50px;
`;

const LogoutButton=styled.div`
  width: 130px;
  height: 40px;
  background-color: blueviolet;
  text-align: center;
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border:none ;
  border-radius: 8px;
  color: white;

`
