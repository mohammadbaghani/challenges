import { Stack, Typography } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, clearTodo, editTodo } from "./store/TodoReducer";
import { Formik, Form, Field } from "formik";
const Todo = () => {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const handleSubmitt = (e) => {
    if (!text) {
      setText("");
    }

    else if (isEditing && editingId && text) {
      dispatch(editTodo({ id: editingId, text }));
      setEditingId(null);
    } else {
      dispatch(addTodo(text));
      setText('');
    }




    setIsEditing(false);
  };




  const handleEdit = (id, newText) => {
    setIsEditing(true);
    setEditingId(id);
    setText(newText);
  };
  function handleKeyDown(event) {




    const allowed_chars = ['‌', ' ', 'آ', 'ا', 'ب', 'پ', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'و', 'ه', 'ی', 'ي', 'ك', 'ة'];

    if (allowed_chars.includes(event.key)) {
      setText(event.target.value)
    }
    else {
      alert("فقط باید حروف فارسی تایپ نمایید")
      setText('')
    }

  }


  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todoList));
  }, [todoList]);
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      sx={{
        width: {
          xs: "90%",
          sm: "60%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        },
        padding: {
          xs: "1rem",
          sm: "1.5rem",
          md: "5rem"
        },

        bgcolor: "#fff9c4",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",

      }}
    >

      <Typography variant="h3" component="h6" color={"#A5A697"} width={"100%"} sx={{
        fontSize: {
          xs: "1.5rem",
          sm: "2rem",
        },
      }}>

      </Typography>


      <Stack flexDirection={"row"} sx={{ width: "100%" }}>






        <Formik
          initialValues={{ name: "ddd", email: "" }}





          onSubmit={(values) => setText(values.name)}




        >



          {(values) => (



            <Form style={{ width: "100%", display: "flex" }}>




              <Button
                variant="contained"
                type="submit"
                sx={{ width: "20%", height: "100%", color: "white" }}
                onClick={handleSubmitt}>
                {isEditing ? "edit" : "Add"}
              </Button>






              <input id="outlined-basic" name="name" label={isEditing ? "Edit task" : "Add New Task"}


                onKeyDown={(event) => handleKeyDown(event)}


                sx={{ width: "80%" }}>
              </input>



            </Form>
          )}
        </Formik>






      </Stack>



      <Stack sx={{ width: "100%" }} spacing={2}>
        {todoList.map((item) => (
          <TodoItem key={item.id} {...item} handleEdit={handleEdit} />
        ))}
      </Stack>
      <Button
        variant="contained"
        onClick={() => dispatch(clearTodo())}
        sx={{ width: "100%", color: "white" }}
      >
        حذف همه
      </Button>
    </Stack>
  );
};

export default Todo;







