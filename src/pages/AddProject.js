import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProject } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      margin: theme.spacing(1),
      width: "55ch",
    },
  },
}));
const AddProject = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  let history = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  const [projectState, setProjectState] = useState({
    name: "",
    tasks: [],
    dueDate: "",
    isFinished: "In Process",
  });

  const handlerInputChange = (e) => {
    let { name, value } = e.target;
    setProjectState({
      ...projectState,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !tasks || !dueDate) {
      setError("please fill the required fields");
    } else {
      dispatch(addProject(projectState));
      history("/");
      setError("");
    }
  };

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
  };

  const { name, tasks, dueDate, isFinished } = projectState;

  return (
    <div>
      <Button
        style={{ width: 100, marginTop: "20px" }}
        variant="contained"
        color="secondary"
        onClick={() => {
          history("/");
        }}
      >
        Go Back
      </Button>

      <h1>Add Project</h1>
      {error && <h4 style={{ color: "red" }}>{error}</h4>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Name"
          name="name"
          value={name}
          type="text"
          onChange={handlerInputChange}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Task"
          name="tasks"
          value={tasks}
          type="text"
          onChange={handlerInputChange}
        />

        <br />

        <TextField
          id="date"
          label="Birthday"
          type="date"
          name="dueDate"
          defaultValue="2017-05-24"
          className={classes.textField}
          value={dueDate}
          onChange={handlerInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />

        <input
          id="isFinished"
          label="Done?"
          name="isFinished"
          value={isFinished}
          type="checkbox"
          checked={isChecked}
          onClick={handleCheckBox}
        />
        <br />
        <Button
          style={{ width: 100 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Project
        </Button>
      </form>
    </div>
  );
};

export default AddProject;
