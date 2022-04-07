import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, getOneProject } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    "& > *": {
      margin: theme.spacing(1),
      width: "55ch",
    },
  },
}));
const EditProject = () => {
  const classes = useStyles();
  let dispatch = useDispatch();
  let history = useNavigate();
  let { id } = useParams();
  const { project } = useSelector((state) => state.projects);
  const [error, setError] = useState("");

  const [projectState, setProjectState] = useState({
    name: "",
    tasks: [],
    dueDate: "",
    isFinished: false,
  });

  useEffect(() => {
    dispatch(getOneProject(id));
  }, []);

  useEffect(() => {
    if (project) {
      setProjectState({ ...project });
    }
  }, [project]);

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
      dispatch(updateProject(projectState, id));
      history("/");
      setError("");
    }
  };

  const handleCheckBox = () => {
    var checkbox = document.getElementById("checkIf");
    if (checkbox.checked === true) {
      setProjectState({ ...projectState, [projectState.isFinished]: "Done" });
    }
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

      <h1>Edit Project</h1>
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
          value={name || ""}
          type="text"
          onChange={handlerInputChange}
        />
        <br />

        <TextField
          id="standard-basic"
          label="Task"
          name="tasks"
          value={tasks || ""}
          type="text"
          onChange={handlerInputChange}
        />

        <br />

        <TextField
          id="date"
          label="Due Date"
          type="date"
          name="dueDate"
          value={dueDate || ""}
          onChange={handlerInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />

        <input
          id="checkIf"
          label="Done?"
          name="isFinished"
          value={isFinished || ""}
          type="checkbox"
          onClick={handleCheckBox}
        />
        <br />
        <Button
          style={{ width: 100 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Update Project
        </Button>
      </form>
    </div>
  );
};

export default EditProject;
