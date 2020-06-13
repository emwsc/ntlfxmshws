import React from "react";

const Theme = () => (
  <>
    <style jsx global>
      {`
        :root {
          --space-cadet: hsla(235, 35%, 26%, 1);
          --cool-grey: hsla(218, 19%, 68%, 1);
          --cultured: hsla(197, 3%, 96%, 1);
          --bright-navy-blue: #2d7dd2;
          --maximum-blue-purple: #b4adea;
          --vivid-sky-blue: #5adbff;
          --jonquil: #f7cb15;
          --white: #ffffff;
          --graish: #515259;
          --cornflower: #91a6ff;
          --bg-graish: #f4f8fe;
          --bluish: #b9d1f4;
          --netflix: #e50914;
          --greenish: #32965d;
          --font-size-xxl: 20px;
          --font-size-l: 16px;
          --font-size-m: 14px;
          --font-size-s: 12px;
          --font-heavy: "Oswald", sans-serif;
          --font-normal: "Open Sans", sans-serif;
        }
        body {
          margin: 0;
          padding: 0;
          font-family: var(--font-normal);
        }

        .title {
          font-family: var(--font-heavy);
          font-size: var(--font-size-xxl);
        }

        .netflix {
          color: var(--netflix);
        }

        .link {
          color: var(--bright-navy-blue);
          font-weight: bold;
        }

        .text {
          margin: 0;
          display: block;
        }

        .text_centered {
          display: flex;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        .button {
          border: none;
          font-family: var(--font-normal);
          background: var(--white);
          font-weight: normal;
          height: 30px;
          border-radius: 5px;
          border: 5px solid transparent;
          transition: all 0.1s linear;
        }

        .button:focus {
          border: 5px solid var(--bright-navy-blue);
        }

        .button:hover{
          background: var(--bright-navy-blue);
          color: var(--white);
        }

        .button::-moz-focus-inner {
          border: 0;
        }

        .button_inverse {
          background: #000;
          color: var(--white);
        }
      `}
    </style>
  </>
);

export default Theme;
