import { Dispatch, SetStateAction } from 'react';

interface ProgressBarProps {
  setTimePosition: Dispatch<SetStateAction<number>>;
  videoPosition: number | undefined;
}

export default ProgressBarProps;
