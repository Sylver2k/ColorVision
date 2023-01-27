import {RefObject} from "react";

interface VideoFrameProps {
  selectedFile: string;
  colorblindFile: string;
  cvd: string;
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef:RefObject<HTMLCanvasElement>;
}

export default VideoFrameProps;
