import "./globals.css";
import DownloadBtn from "./components/DownloadBtn/DownloadBtn";
import UploadBtn from "./components/UploadBtn/UploadBtn";
import { useEffect, useRef, useState} from "react";
import "./app.css";
import PlayerFrame from "./components/PlayerFrame/PlayerFrame";
/**
 *
 * @returns The player frame and the upload,download buttons
 */
function App() {
  useEffect(() => {
    document.title = "ColorVision";
  }, []);

  const [selectedFile, setSelectedFile] = useState<string>("default.mp4");
  const [selectedCvd, setSelectedCVD] = useState<string>("Protanopia");
  const [colorblindFile, setColorblindFile] = useState<string>("");
  const canvasRef:any = useRef();
  const videoRef:any = useRef();

  const generateColorblindFile = (selectedFile: string): void => {
    const convertedFile = "";
    /**
     * TODO: Colorblind file implementation
     */
    setColorblindFile(convertedFile);
  };

  const useDefaultVideoOrUserInput = (selectedFile: string): string => {
    return selectedFile === "default.mp4" ? "/Videos/default.mp4" : selectedFile;
  };

  const dragLeaveHandler = (event: any) => {
    if (event.clientX === 0 && event.clientY === 0) {
      //event got fired when the file got dragged to the outside of the browser
      event.preventDefault();
      document.getElementById("drop_zone")?.classList.remove("on-dragging");
    }
  };

  const dragEnterHandler = (event: any) => {
    event.preventDefault();
    document.getElementById("drop_zone")?.classList.add("on-dragging");
  };

  return (
    <div
      className="outer-container"
      onDragLeave={(event) => dragLeaveHandler(event)}
      onDragEnter={(event) => dragEnterHandler(event)}
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
          colorblindFile={colorblindFile}
          cvd={selectedCvd}
        />
      </div>
      <div className="interaction-container">
        <UploadBtn setSelectedFile={setSelectedFile}></UploadBtn>
        <select name="cvdselector" id="cvd" className="select-cvd" onChange={(event) => setSelectedCVD(event.target.value)}>
          <option value="Protanopia">Protanopia</option>
          <option value="Protanomaly">Protanomaly</option>
          <option value="Deuteranopia">Deuteranopia</option>
          <option value="Deuteranomaly">Deuteranomaly</option>
          <option value="Tritanopia">Tritanopia</option>
          <option value="Tritanomaly">Tritanomaly</option>
        </select>
        <DownloadBtn videoRef={videoRef} canvasRef={canvasRef} selectedFile={selectedFile}></DownloadBtn>
      </div>

      <div className="name-banner">
        <h1>ColorVision</h1>
        <span className="material-symbols-outlined">invert_colors</span>
      </div>
    </div>
  );
}

export default App;
