import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddProject from "./pages/AddProject";
import EditProject from "./pages/EditProject";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/add" element={<AddProject />} />
        <Route path="/edit/:id" element={<EditProject />} />
      </Routes>
    </div>
  );
}

export default App;
