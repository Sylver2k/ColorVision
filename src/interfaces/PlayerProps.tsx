import { Dispatch, SetStateAction } from 'react';
import {RefObject} from "react";
interface PlayerProps {
  isPaused: boolean;
  isColorblindMode: boolean;
  isMultiView: boolean;
  selectedFile: string;
  currentVolume: number;
  colorblindFile: string;
  timePosition: number;
  setVideoPosition: Dispatch<SetStateAction<number | undefined>>;
  canvasRef:RefObject<HTMLCanvasElement>;
  videoRef: RefObject<HTMLVideoElement>;
}
export default PlayerProps;
