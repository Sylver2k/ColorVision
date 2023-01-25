import {RefObject} from "react";

interface DownloadBtnProps {
  selectedFile: string;
  canvasRef: RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
}

export default DownloadBtnProps;
