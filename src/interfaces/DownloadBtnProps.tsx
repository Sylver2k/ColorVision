import { RefObject } from "react";

interface DownloadBtnProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
}

export default DownloadBtnProps;
