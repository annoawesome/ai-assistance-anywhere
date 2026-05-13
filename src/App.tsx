import React, { useEffect, useRef } from "react";
import generate from "./generatorPipeline.js";

export default function App() {
  const textRef: React.RefObject<HTMLParagraphElement | null> = useRef(null);

  useEffect(() => {
    generate().then((response) => {
      if (!(textRef.current && response)) {
        return;
      }

      textRef.current.innerText = response.toString();
    });
  }, []);

  return (
    <>
      <h1>App</h1>
      <p ref={textRef}></p>
    </>
  );
}
