import { Dispatch, RefObject, SetStateAction } from "react";

interface UploadBtnProps {
  setSelectedFile: Dispatch<SetStateAction<string>>;
  dropzoneRef: RefObject<HTMLInputElement>;
}

export default UploadBtnProps;
