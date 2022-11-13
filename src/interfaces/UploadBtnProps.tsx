import { Dispatch, SetStateAction } from 'react';

interface UploadBtnProps {
  setSelectedFile: Dispatch<SetStateAction<string>>;
}

export default UploadBtnProps;
