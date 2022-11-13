import { Dispatch, SetStateAction } from 'react';

interface VolumeBtnProps {
  setCurrentVolume: Dispatch<SetStateAction<number>>;
}
export default VolumeBtnProps;
