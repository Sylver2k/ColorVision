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

  const dropHandler = (event: any) => {
    event.preventDefault();
    const dropArea = document.getElementById("drop_zone");
    dropArea!.classList.remove("on-dragging");

    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item) => {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log(`Filename: ${file.name}`);
          console.log("File", file)
          if(file.type.includes("video/")) {
            setSelectedFile(URL.createObjectURL(file));
          } else {
            console.log("Not a valid video file")
          }
          
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((file) => {
        console.log(`Filename: ${file.name}`);
      });
    }

  };

  const dragOverHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <div
      onDrop={(event) => dropHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
    >
      <label id="drop_zone" htmlFor="file-upload" className="button-branding">
        <input
          type="file"
          id="file-upload"
          accept="video/*"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            uploadFile(event);
          }}
        ></input>
        Upload
      </label>
    </div>
  );
}

export default UploadBtn;