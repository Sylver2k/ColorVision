import './volumebtn.css';
import VolumeBtnProps from 'interfaces/VolumeBtnProps';

/**
 * The user can change the volume
 * @param setCurrentVolume sets the state when the volume changes
 * @returns volume button
 */
function VolumeBtn({ setCurrentVolume }: VolumeBtnProps) {
  return (
    <input
      type="range"
      className="volume"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setCurrentVolume(parseInt(event.target.value))
      }
    ></input>
  );
}

export default VolumeBtn;
