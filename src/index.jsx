import { createRoot } from "react-dom/client";
import { MainView } from "./main-view/main-view";
import { MovieCard } from "./movie-card/movie-card";
import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);