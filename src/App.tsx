import DownloadBtn from './components/DownloadBtn/DownloadBtn';
import UploadBtn from './components/UploadBtn/UploadBtn';
import { useState } from 'react';
import './app.css';
import PlayerFrame from './components/PlayerFrame/PlayerFrame';
/**
 *
 * @returns The player frame and the upload,download buttons
 */
function App() {
  const [selectedFile, setSelectedFile] = useState<string>('default.mp4');
  const [colorblindFile, setColorblindFile] = useState<string>('');
  const generateColorblindFile = (selectedFile: string): void => {
    const convertedFile = '';
    /**
     * TODO: Colorblind file implementation
     */
    setColorblindFile(convertedFile);
  };
  return (
    <div className="outer-container">
      <PlayerFrame
        selectedFile={selectedFile}
        colorblindFile={colorblindFile}
      />
      <div className="files">
        <UploadBtn setSelectedFile={setSelectedFile}></UploadBtn>
        <DownloadBtn selectedFile={selectedFile}></DownloadBtn>
      </div>
    </div>
  );
}

export default App;
