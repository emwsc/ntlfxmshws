import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { LottieIcon } from "../LottieIcon";

import { DropzoneProps } from "./types";

import uploadIconLottie from './assets/upload.json';

const DragBeforeUpload = () => {
  const onLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div className="dropzone__before-upload">
      <div className='dropzone__upload-icon'>
        <LottieIcon animationData={uploadIconLottie} speed={0.5} />
      </div>
      <p className="title dropzone__title">
        Загрузите .csv файл с историей просмотров{" "}
        <span className="netflix">Netflix</span>
      </p>
      <p className="dropzone__description">
        <span className="text">
          Его можно выгрузить из{" "}
          <a
            onClick={onLinkClick}
            target="__blank"
            href="https://www.netflix.com/YourAccount"
          >
            настроек аккаунта
          </a>
        </span>
        <span className="text text_centered">
          Viewing activity{" "}
          <img alt="Стрелочка вправо" src="/icons/arrow-right-s-fill.svg" />{" "}
          download all
        </span>
        <span className="text">Просто перетащите файл в это окно</span>
      </p>
      <style jsx>{`
        .dropzone__before-upload {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-gap: 5px;
          grid-template-rows: auto auto;
          grid-template-areas:
            "icon title"
            "icon description";
          align-items: center;
        }

        .dropzone__upload-icon {
          grid-area: icon;
          width: 100px;
          height: auto;
          object-fit: contain;
        }

        .dropzone__title {
          grid-area: title;
          margin: 0;
        }

        .dropzone__description {
          grid-area: description;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export const Dropzone = ({ onDropFilesCompleted }: DropzoneProps) => {
  const [isFailedToUploadFile, setFailedToUploadFile] = useState(false);

  const onDrop = useCallback((files) => {
    if (!files || !files[0]) {
      return;
    }
    const [csv] = files;
    if (!csv.name.endsWith(".csv")) {
      return setFailedToUploadFile(true);
    }
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target.result as string;
      onDropFilesCompleted(text);
    };
    reader.onerror = () => {
      setFailedToUploadFile(true);
    };
    reader.readAsText(csv);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="dropzone">
      {isFailedToUploadFile && (
        <div>
          <span className="title">Что-то пошло не так</span>
          <span className="text">Возможно файл поврежден или содержит некоректные</span>
          данные
        </div>
      )}
      {!isFailedToUploadFile && (
        <>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="title">Отпустите, чтобы загрузить</p>
            ) : (
              <DragBeforeUpload />
            )}
          </div>
        </>
      )}
      <style jsx>{`
        .dropzone {
          width: 96vw;
          height: 96vh;
          padding: 10px;
          box-sizing: border-box;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
