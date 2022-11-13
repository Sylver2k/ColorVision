import './uploadbtn.css';
import UploadBtnProps from 'interfaces/UploadBtnProps';

/**
 * The user can upload their own video
 * @param setSelectedFile sets the state when a files was uploaded
 * @returns upload button
 */
function UploadBtn({ setSelectedFile }: UploadBtnProps) {
  const uploadFile = () => {
    const uploadedFile: string = '';
    /**
     * TODO: Upload file implementation
     */
    setSelectedFile(uploadedFile);
  };
  return (
    <div className="upload" onClick={uploadFile}>
      Upload
    </div>
  );
}

export default UploadBtn;
