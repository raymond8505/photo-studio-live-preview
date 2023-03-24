export enum ChecklistItemType {
  DISH = "dish",
  GENERAL = "general",
}
export interface ChecklistItem {
  id: number;
  name: string;
  type: ChecklistItemType;
}
interface Props {
  checklist: ChecklistItem[];
  type: ChecklistItemType;
  add: (itemName: string, type: ChecklistItemType) => void;
  del: (id: number) => void;
}
export function Checklist({ checklist, type, add, del }: Props) {
  function handleChecklistKeyPress(
    e: React.KeyboardEvent<HTMLInputElement>,
    type: ChecklistItemType
  ) {
    if (e.key === "Enter") {
      const itemName = (e.target as HTMLInputElement).value;

      add(itemName, type);
      (e.target as HTMLInputElement).value = "";
    }
  }
  return (
    <ul className="checklist">
      {checklist
        .filter((item) => item.type === type)
        .map((item, i) => (
          <li key={i} className="checklist__item">
            <span>{item.name}</span>
            <button
              className="close-btn"
              onClick={() => {
                del(item.id);
              }}
            >
              &times;
            </button>
          </li>
        ))}
      <li>
        <input
          type="text"
          placeholder="New Item"
          onKeyDown={(e) => {
            handleChecklistKeyPress(e, type);
          }}
        />
      </li>
    </ul>
  );
}
