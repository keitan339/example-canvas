import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./routes/PageRoutes";

const App = () => {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
};

export default App;
