import { SyntheticEvent, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./reset.css";
import "./App.css";
import { Checklist, ChecklistItem, ChecklistItemType } from "./Checklist";

const CHECKLIST_STORAGE_KEY = "checklist";

function App() {
  const [jpgs, setJpgs] = useState([]);
  const serverRoot = "http://localhost:3002";
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  const getStoredChecklist = (): ChecklistItem[] =>
    JSON.parse(window.localStorage.getItem(CHECKLIST_STORAGE_KEY) || "[]");

  const setStoredChecklist = (checklist: ChecklistItem[]) =>
    window.localStorage.setItem(
      CHECKLIST_STORAGE_KEY,
      JSON.stringify(checklist)
    );

  const addChecklistItem = (itemName: string, type: ChecklistItemType) => {
    if (itemName !== "") {
      const item: ChecklistItem = {
        name: itemName,
        type,
        id: new Date().getTime(),
      };

      setChecklist((old) => {
        return [...old, item];
      });

      setStoredChecklist([...checklist, item]);
    }
  };

  const deleteChecklistItem = (id: number) => {
    const remaining = checklist.filter((item) => item.id !== id);
    setChecklist(remaining);
    setStoredChecklist(remaining);
  };

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
    const storedList =
      window.localStorage.getItem(CHECKLIST_STORAGE_KEY) || "[]";
    setChecklist(getStoredChecklist());
  }, []);

  return (
    <>
      <div className="App">
        <div className="checklists">
          <div className="checklist checklist--dish">
            <h2>
              <span>Dish</span>
              <button
                className="clear-btn"
                onClick={() => {
                  setChecklist(
                    checklist.filter(
                      (item) => item.type !== ChecklistItemType.DISH
                    )
                  );
                }}
              >
                &#x1F6AB;
              </button>
            </h2>
            <Checklist
              type={ChecklistItemType.DISH}
              add={addChecklistItem}
              del={deleteChecklistItem}
              checklist={checklist}
            />
          </div>
          <div className="checklist checklist--general">
            <h2>General</h2>
            <Checklist
              type={ChecklistItemType.GENERAL}
              add={addChecklistItem}
              del={deleteChecklistItem}
              checklist={checklist}
            />
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
