import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./reset.css";
import "./App.css";

enum ChecklistItemType {
  DISH = "dish",
  GENERAL = "general",
}
interface ChecklistItem {
  id: number;
  name: string;
  type: ChecklistItemType;
}
function App() {
  const [jpgs, setJpgs] = useState([]);
  const serverRoot = "http://localhost:3002";
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

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

  useEffect(() => {
    const storedList = window.localStorage.getItem("checklist") || "[]";
    setChecklist(JSON.parse(storedList) as ChecklistItem[]);
  }, []);

  return (
    <>
      <div className="App">
        <div className="checklists">
          <div className="checklists__dish">
            <h2>Dish</h2>
            <ul>
              {checklist
                .filter((item) => item.type === ChecklistItemType.DISH)
                .map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
              <li>
                <input type="text" placeholder="New Item" />
              </li>
            </ul>
          </div>
          <div className="checklists__general">
            <h2>General</h2>
            <ul>
              {checklist
                .filter((item) => item.type === ChecklistItemType.GENERAL)
                .map((item, i) => (
                  <li key={i}>{item.name}</li>
                ))}
            </ul>
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
