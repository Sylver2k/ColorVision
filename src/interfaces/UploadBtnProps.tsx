import { Dispatch, RefObject, SetStateAction } from "react";

interface UploadBtnProps {
  setSelectedFile: Dispatch<SetStateAction<string>>;
  dropzoneRef: RefObject<HTMLLabelElement>;
}

export default UploadBtnProps;
