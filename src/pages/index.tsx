import React, { useEffect } from "react";
import Router from "next/router";

import { App } from "../components/App";
import { getToken } from "../logic";

const Index = () => {
  useEffect(() => {
    const token = getToken();
    if (!token) {
      Router.push("/auth");
      return;
    }
  }, []);

  return (
    <main className="main">
      <App />
      <style jsx>{`
        .main {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </main>
  );
};

export default Index;
