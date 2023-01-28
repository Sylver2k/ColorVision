import DownloadBtn from "./components/DownloadBtn/DownloadBtn";
import UploadBtn from "./components/UploadBtn/UploadBtn";
import React, { RefObject, useRef, useState } from "react";
import "./app.css";
import PlayerFrame from "./components/PlayerFrame/PlayerFrame";
/**
 *
 * @returns The player frame and the upload,download buttons
 */
function App() {
  const [selectedFile, setSelectedFile] = useState<string>("default.mp4");
  const [selectedCvd, setSelectedCVD] = useState<string>("Protanopia");
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);
  const dropzoneRef = useRef<HTMLInputElement>(null);

  const useDefaultVideoOrUserInput = (selectedFile: string): string => {
    return selectedFile === "default.mp4"
      ? "/Videos/default.mp4"
      : selectedFile;
  };

  const dragLeaveHandler = (event: React.DragEvent) => {
    if (event.clientX === 0 && event.clientY === 0) {
      //event got fired when the file got dragged to the outside of the browser
      event.preventDefault();
      dropzoneRef.current?.classList.remove("on-dragging");
    }
  };

  const dragEnterHandler = (event: React.DragEvent) => {
    event.preventDefault();
    dropzoneRef.current?.classList.add("on-dragging");
  };

  return (
    <div
      className="outer-container"
      onDragLeave={(event: React.DragEvent) => dragLeaveHandler(event)}
      onDragEnter={(event: React.DragEvent) => dragEnterHandler(event)}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="video-container">
        <PlayerFrame
          canvasRef={canvasRef}
          videoRef={videoRef}
          selectedFile={useDefaultVideoOrUserInput(selectedFile)}
          cvd={selectedCvd}
        />
      </div>
      <div className="interaction-container">
        <UploadBtn
          setSelectedFile={setSelectedFile}
          dropzoneRef={dropzoneRef}
        ></UploadBtn>
        <select
          name="cvdselector"
          id="cvd"
          className="select-cvd"
          onChange={(event) => setSelectedCVD(event.target.value)}
        >
          <option value="Protanopia">Protanopia</option>
          <option value="Protanomaly">Protanomaly</option>
          <option value="Deuteranopia">Deuteranopia</option>
          <option value="Deuteranomaly">Deuteranomaly</option>
          <option value="Tritanopia">Tritanopia</option>
          <option value="Tritanomaly">Tritanomaly</option>
        </select>
        <DownloadBtn videoRef={videoRef} canvasRef={canvasRef} />
      </div>

      <div className="name-banner">
        <h1>ColorVision</h1>
        <span className="material-symbols-outlined">invert_colors</span>
      </div>
    </div>
  );
}

export default App;
