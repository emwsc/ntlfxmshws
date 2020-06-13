import React from "react";

import {App} from "../components/App";

const Index = () => {
  return (
    <main className="main">
      <App />
      <style jsx>{`
          .main{
              width: 100vw;
              height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
          }
          `}</style>
    </main>
  );
};

export default Index;