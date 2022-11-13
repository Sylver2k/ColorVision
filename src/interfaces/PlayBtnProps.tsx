import { Dispatch, SetStateAction } from 'react';
interface PlayBtnProps {
  isPaused: boolean;
  setIsPaused: Dispatch<SetStateAction<boolean>>;
}
export default PlayBtnProps;
