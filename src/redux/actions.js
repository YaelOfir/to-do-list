import * as types from "./actionType";
import axios from "axios";

// const api = process.env.REACT_APP_API; doesnt work in this machine
const getProjects = (projects) => ({
  type: types.GET_PROJECTS,
  payload: projects,
});

const projectDeleted = () => ({
  type: types.DELETE_PROJECTS,
});

const projectAdded = () => ({
  type: types.ADD_PROJECTS,
});

const projectUpdated = () => ({
  type: types.UPDATE_PROJECTS,
});

const getSingleProject = (project) => ({
  type: types.GET_ONE_PROJECT,
  payload: project,
});
export const loadProjects = () => {
  return function (dispatch) {
    axios
      .get(`http://localhost:1000/projects`)
      .then((res) => {
        console.log("res", res);
        dispatch(getProjects(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteProject = (id) => {
  return function (dispatch) {
    axios
      .delete(`http://localhost:1000/projects/${id}`)
      .then((res) => {
        console.log("res", res);
        dispatch(projectDeleted());
        dispatch(loadProjects());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addProject = (project) => {
  return function (dispatch) {
    axios
      .post(`http://localhost:1000/projects/`, project)
      .then((res) => {
        console.log("res", res);
        dispatch(projectAdded());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getOneProject = (id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:1000/projects/${id}`)
      .then((res) => {
        console.log("res", res);
        dispatch(getSingleProject(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateProject = (project, id) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:1000/projects/${id}`, project)
      .then((res) => {
        console.log("res", res);
        dispatch(projectUpdated());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
