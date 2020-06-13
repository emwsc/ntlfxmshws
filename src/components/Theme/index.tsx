import React from "react";

const Theme = () => (
  <>
    <style jsx global>
      {`
        :root {
          --space-cadet: hsla(235, 35%, 26%, 1);
          --cool-grey: hsla(218, 19%, 68%, 1);
          --cultured: hsla(197, 3%, 96%, 1);
          --bright-navy-blue: #2D7DD2;
          --maximum-blue-purple: #B4ADEA;
          --vivid-sky-blue: #5ADBFF;
          --jonquil: #F7CB15;
          --white: #FFFFFF;
          --graish: #515259;
          --bg-graish: #F4F8FE;
          --bluish: #B9D1F4;
          --netflix: #e50914;
          --isabelline: #f2edeb;
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
      `}
    </style>
  </>
);

export default Theme;
