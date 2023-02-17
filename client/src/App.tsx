import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./reset.css";
import "./App.css";

function App() {
  const [jpgs, setJpgs] = useState([]);
  const serverRoot = "http://localhost:3002";

  useEffect(() => {
    setInterval(() => {
      fetch("//localhost:3002/jpgs.json").then((resp) => {
        resp.json().then((json) => {
          setJpgs(json);
        });
      });
    }, 1000);
  }, []);

  return (
    <>
      <div className="App">
        <div className="gallery">
          {jpgs.map((jpg) => {
            return <img src={`${serverRoot}/images/tn/${jpg}`} />;
          })}
        </div>
        <div className="viewer">
          <img src={`${serverRoot}/images/lg/${jpgs[jpgs.length - 1]}`} />
        </div>
      </div>
    </>
  );
}

export default App;
