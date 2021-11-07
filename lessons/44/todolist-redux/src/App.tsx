import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { MouseEvent, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { AppDispatch, RootState } from "./store";
import {
  addTodo,
  deleteDoneTasks,
  removeAllTodos,
  removeTodo,
  setTodoStatus,
} from "./store/reducer/reducerTodos";

//TODO
// add new task -- button adding task in list
//input that will be pushed to arr with tasks
//display tasks
//each has button that deletes
//each has button that allows edit
//each has checkbox
//filter tasks -- all --done --ToDo
//button Delete done tasks -- so flag done boolean true(mb false)
//button Delete All tasks -- so empty state with tasks

const App = () => {
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const [todoDescription, setTodoDescription] = useState("");
  const inputRef = useRef(null);

  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event: any, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  // dispatch()
  // const handler = useCallback(() => {
  //   addMessage(inputRef.current.value);
  //   inputRef.current.value = '';
  // }, [inputRef, addMessage]);
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Redux ToDo List
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Item"
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          dispatch(addTodo(todoDescription));
          setTodoDescription("");
        }}
      >
        Add Item
      </Button>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        fullWidth
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="done">Done</ToggleButton>
        <ToggleButton value="todo">Todo</ToggleButton>
      </ToggleButtonGroup>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.description}
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <Checkbox
                edge="end"
                value={todo.completed}
                onChange={() => {
                  dispatch(setTodoStatus({ completed: !todo.completed, id: todo.id }));
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <ButtonGroup fullWidth disableElevation variant="contained">
        <Button
          onClick={() => {
            dispatch(removeAllTodos());
          }}
        >
          Delete All tasks
        </Button>
        <Button
          onClick={() => {
            dispatch(deleteDoneTasks());
          }}
        >
          Delete done tasks
        </Button>
      </ButtonGroup>
    </Container>
  );
  // return (
  //   <div className="App">
  //     <h1>Redux ToDo List {todoList}</h1>
  //     <div className="submitTask">
  //       <input
  //         type="text"
  //         ref={inputRef}
  //         onChange={(e) => setTodoDescription(e.target.value)}
  //         value={todoDescription}
  //       />
  //       <button
  //         onClick={() => {
  //           dispatch(addTodo(todoDescription));
  //           setTodoDescription("");
  //         }}
  //       >
  //         Add Task
  //       </button>
  //     </div>
  //     <div className="filterButtons">
  //       <button>All</button>
  //       <button>Done</button>
  //       <button>Todo</button>
  //     </div>
  //     <div>
  //       <h2>Todos</h2>
  //     </div>
  //     <button>Delete done tasks</button>
  //     <button>Delete all tasks</button>
  //   </div>
  // );
};

export default App;