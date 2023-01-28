import { RefObject } from "react";
interface PlayerProps {
  isColorblindMode: boolean;
  isMultiView: boolean;
  selectedFile: string;
  currentVolume: number;
  timePosition: number;
  simulatedCVD: string;
  canvasRef: RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
}
export default PlayerProps;
