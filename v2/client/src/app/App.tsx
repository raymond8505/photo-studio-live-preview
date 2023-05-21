import { useEffect, useRef, useState } from "react";
import { ReadyState, useServer } from "../useServer";

export const App = () => {
  const { sendJson, readyState } = useServer((msg) => {
    console.log(msg);
  });
  return readyState === ReadyState.OPEN && <></>;
};
