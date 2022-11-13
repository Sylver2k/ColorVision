import './downloadbtn.css';
import DownloadBtnProps from 'interfaces/DownloadBtnProps';

/**
 * The user can download the video
 * @param selectedFile default or uploaded file
 * @returns a button to download the file
 */
function DownloadBtn({ selectedFile }: DownloadBtnProps) {
  const downloadFile = (selectedFile: string) => {
    /**
     * TODO: Download file implementation
     */
  };
  return (
    <div className="download" onClick={() => downloadFile(selectedFile)}>
      Download
    </div>
  );
}

export default DownloadBtn;
