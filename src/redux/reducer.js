import * as types from "./actionType";

const initialState = {
  projects: [],
  project: {},
  loading: false,
};

const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PROJECTS:
      return { ...state, projects: action.payload, loading: false };
    case types.DELETE_PROJECTS:
      return { ...state, projects: action.payload, loading: false };
    case types.ADD_PROJECTS:
      return { ...state, projects: action.payload, loading: false };
    case types.GET_ONE_PROJECT:
      return { ...state, project: action.payload, loading: false };
    case types.UPDATE_PROJECTS:
      return { ...state, project: action.payload, loading: false };
    default:
      return state;
  }
};

export default toDoListReducer;
