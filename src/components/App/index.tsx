import React, { useCallback, useState } from "react";

import { Dropzone } from "../Dropzone";
import { Processor } from "../Processor";

const fakeTextContent = `Title,Date
    "Narcos: Mexico: Season 2: Alea lacta Est","6/7/20"
    "Narcos: Mexico: Season 2: Salva El Tigre","6/7/20"
    "Narcos: Season 2: Al Fin Cayó!","6/7/20"
    "Narcos: Season 3: Going Back to Cali","6/7/20"
    "Narcos: Season 3: The Kingpin Strategy","6/7/20"
    "Kingdom: Season 2: Episode 6","6/6/20"
    "Kingdom: Season 2: Episode 5","6/6/20"
    "Kingdom: Season 2: Episode 4","6/6/20"
    "Kingdom: Season 2: Episode 3","6/4/20"
    "Kingdom: Season 2: Episode 2","5/31/20"
    "Kingdom: Season 2: Episode 1","5/31/20"
    "How I Met Your Mother: Season 5: Slapsgiving 2: Revenge of the Slap","3/19/19"
    `;

export const App = () => {
  const [textContent, setTextContent] = useState<string | null>(null);
  const onDropFilesCompleted = useCallback((textContent) => {
    setTextContent(textContent);
  }, []);

  const showDropzone = !textContent;
  const showProcessor = !!textContent;

  return (
    <section>
      {showDropzone && <Dropzone onDropFilesCompleted={onDropFilesCompleted} />}
      {showProcessor && <Processor textContent={textContent} />}
      {/* <Processor textContent={fakeTextContent} /> */}
    </section>
  );
};
