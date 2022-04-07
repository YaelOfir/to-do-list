import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { loadProjects, deleteProject } from "../redux/actions";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useNavigate } from "react-router-dom";
const useButtonStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    marginTop: 100,
    minWidth: 900,
  },
});

const HomePage = () => {
  const classes = useStyles();
  const btnClasses = useButtonStyle();
  let dispatch = useDispatch();
  let history = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(loadProjects());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProject(id));
    }
  };

  return (
    <div>
      <div className={btnClasses.root}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history("/add")}
        >
          Add New Project
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Project</StyledTableCell>
              <StyledTableCell align="right">Tasks</StyledTableCell>
              <StyledTableCell align="right">DueDate</StyledTableCell>
              <StyledTableCell align="right">IsFinished?</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects &&
              projects.map((project) => (
                <StyledTableRow key={project.id}>
                  <StyledTableCell component="th" scope="row">
                    {project.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {project.tasks}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {project.dueDate}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {project.isFinished}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <ButtonGroup
                      className={btnClasses.root}
                      variant="contained"
                      aria-label="contained primary button group"
                    >
                      <Button
                        onClick={() => handleDelete(project.id)}
                        style={{ marginRight: "5px" }}
                        color="secondary"
                      >
                        Delete
                      </Button>
                      <Button
                        color="primary"
                        onClick={() => history(`/edit/${project.id}`)}
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default HomePage;
