import DownloadBtn from './components/DownloadBtn/DownloadBtn';
import UploadBtn from './components/UploadBtn/UploadBtn';
import {useRef, useState} from 'react';
import './app.css';
import PlayerFrame from './components/PlayerFrame/PlayerFrame';
/**
 *
 * @returns The player frame and the upload,download buttons
 */
function App() {
  const [selectedFile, setSelectedFile] = useState<string>('default.mp4');
  const [colorblindFile, setColorblindFile] = useState<string>('');
  const canvasRef:any = useRef();
  const videoRef:any = useRef();

  const generateColorblindFile = (selectedFile: string): void => {
    const convertedFile = '';
    /**
     * TODO: Colorblind file implementation
     */
    setColorblindFile(convertedFile);
  };

  const useDefaultVideoOrUserInput = (selectedFile: string): string => {
    return selectedFile === "default.mp4" ? '/Videos/default.mp4' : selectedFile
  }



  return (
    <div className="outer-container">
      <PlayerFrame
        canvasRef={canvasRef}
        videoRef={videoRef}
        selectedFile={useDefaultVideoOrUserInput(selectedFile)}
        colorblindFile={colorblindFile}
      />
      <div className="files">
        <UploadBtn setSelectedFile={setSelectedFile}></UploadBtn>
        <select name="cvdselector" id="cvd">
          <option value="Protanopia">Protanopia</option>
          <option value="Protanomaly">Protanomaly</option>
          <option value="Deuteranopia">Deuteranopia</option>
          <option value="Deuteranomaly">Deuteranomaly</option>
          <option value="Tritanopia">Tritanopia</option>
          <option value="Tritanomaly">Tritanomaly</option>
        </select>
        <DownloadBtn videoRef={videoRef} canvasRef={canvasRef} selectedFile={selectedFile}></DownloadBtn>
      </div>
    </div>
  );
}

export default App;
