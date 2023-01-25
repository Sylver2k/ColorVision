import "./uploadbtn.css";
import UploadBtnProps from "interfaces/UploadBtnProps";
import { ChangeEvent } from "react";

/**
 * The user can upload their own video
 * @param setSelectedFile sets the state when  files were uploaded
 * @returns upload button
 */
function UploadBtn({ setSelectedFile }: UploadBtnProps) {

  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(URL.createObjectURL(event.target.files![0]));
  };

  return (
    <label htmlFor="file-upload" className="button-branding">
      <input
        type="file"
        id="file-upload"
        className=""
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          uploadFile(event);
        }}
      ></input>
      Upload
    </label>
  );
}

export default UploadBtn;