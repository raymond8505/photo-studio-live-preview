import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./reset.css";
import "./App.css";

function App() {
  const [jpgs, setJpgs] = useState([]);
  const serverRoot = "http://localhost:3002";

  useEffect(() => {
    setInterval(() => {
      fetch(`//localhost:3002/jpgs.json`, {
        cache: "no-store",
      }).then((resp) => {
        resp.json().then((json) => {
          setJpgs(json);
        });
      });
    }, 1000);
  }, []);

  return (
    <>
      <div className="App">
        <div className="checklists">
          <div className="checklists__dish">
            <h2>Dish</h2>
            <ul></ul>
          </div>
          <div className="checklists__general">
            <h2>General</h2>
            <ul></ul>
          </div>
        </div>
        <div className="viewer">
          <div className="gallery">
            {jpgs.map((jpg, i) => {
              return <img src={`${serverRoot}/images/tn/${jpg}`} key={i} />;
            })}
          </div>
          <div className="current-img">
            <img src={`${serverRoot}/images/lg/${jpgs[jpgs.length - 1]}`} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
