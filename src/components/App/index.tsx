import React, { useCallback, useState } from "react";

import { Dropzone } from "../Dropzone";
import { Processor } from "../Processor";

export const App = () => {
  const [textContent, setTextContent] = useState<string | null>(null);
  const onDropFilesCompleted = useCallback((textContent) => {
    setTextContent(textContent);
  }, []);

  const showDropzone = !textContent;
  const showProcessor = !!textContent;

  return (
    <section className="app">
      {showDropzone && <Dropzone onDropFilesCompleted={onDropFilesCompleted} />}
      {showProcessor && <Processor textContent={textContent} />}
      <style jsx>{`
        .app {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </section>
  );
};
