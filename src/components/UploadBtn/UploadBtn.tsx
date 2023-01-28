import "./uploadbtn.css";
import UploadBtnProps from "interfaces/UploadBtnProps";
import React, { ChangeEvent } from "react";

/**
 * The user can upload their own video
 * @param setSelectedFile sets the state when  files were uploaded
 * @returns upload button
 */
function UploadBtn({ setSelectedFile, dropzoneRef }: UploadBtnProps) {
  const uploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(URL.createObjectURL(event.target.files![0]));
  };

  const dropHandler = (event: any) => {
    event.preventDefault();
    dropzoneRef.current?.classList.remove("on-dragging");
    if (event.dataTransfer.items) {
      [...event.dataTransfer.items].forEach((item: any) => {
        if (item.kind === "file") {
          const file: any = item.getAsFile();
          if (file.type.includes("video/")) {
            setSelectedFile(URL.createObjectURL(file));
          } else {
            console.log("Not a valid video file");
          }
        }
      });
    } else {
      [...event.dataTransfer.files].forEach((file) => {
        console.log(`Filename: ${file.name}`);
      });
    }
  };

  const dragOverHandler = (event: React.DragEvent) => {
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
          ref={dropzoneRef}
        ></input>
        Upload
      </label>
    </div>
  );
}

export default UploadBtn;
