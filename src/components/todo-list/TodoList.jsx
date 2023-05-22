import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "@mui/material";
import { todoActionTypes } from "../../store/todo/todoReducer";
import DeleteIcon from '@mui/icons-material/Delete';
const TodoList = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();

  const changeEditValue = (e) => {
    setEditValue(e.target.value);
  };

  const deleteHandler = () => {
    dispatch({ type: todoActionTypes.DELETE_TODO, payload: todo.id });
  };

  const toggleTodoHandler = () => {
    dispatch({ type: todoActionTypes.COMPLETE_TODO, payload: todo.id });
  };

  const editTodoHandler = () => {
    dispatch({
      type: todoActionTypes.EDIT_TODO,
      id: todo.id,
      value: editValue,
    });
    setIsEditing(false);
  };

  const editHandler = () => {
    setIsEditing(true);
    setEditValue(todo.title);
  };

  return (
    <StyledLi>
      {isEditing ? (
        <>
          <input type="text" value={editValue} onChange={changeEditValue} />
          <Button variant="contained" color="success" onClick={editTodoHandler}>
            Save
          </Button>
        </>
      ) : (
        <>
          <input
            style={{ width: "20px", height: "20px",marginTop:"5px" }}
            type="checkbox"
            onClick={toggleTodoHandler}
          />
          <Title color={todo.color} done={todo.completed}>{todo.title}</Title>
          
          <Button variant="contained" color="error"  onClick={deleteHandler} startIcon={<DeleteIcon />}>
            
          </Button>

          <Button variant="contained" onClick={editHandler}>
            edit
          </Button>
        </>
      )}
    </StyledLi>
  );
};

export default TodoList;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.span`
  text-decoration: ${(props) => (props.done ? "line-through" : "")};
  font-size: 20px;
  font-weight: bold;
  color: ${(props)=> (props.color ? "white" :"")};
`;
