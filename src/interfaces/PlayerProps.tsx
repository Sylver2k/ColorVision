import { Dispatch, SetStateAction } from 'react';
interface PlayerProps {
  isPaused: boolean;
  isColorblindMode: boolean;
  isMultiView: boolean;
  selectedFile: string;
  currentVolume: number;
  colorblindFile: string;
  timePosition: number;
  setVideoPosition: Dispatch<SetStateAction<number | undefined>>;
}
export default PlayerProps;
