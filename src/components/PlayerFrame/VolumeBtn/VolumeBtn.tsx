import "./volumebtn.css";
import VolumeBtnProps from "interfaces/VolumeBtnProps";

/**
 * The user can change the volume
 * @param setCurrentVolume sets the state when the volume changes
 * @returns volume button
 */
function VolumeBtn({ setCurrentVolume }: VolumeBtnProps) {
  return (
    <div className="volume-container">
      <span className="material-symbols-outlined volume-icon">volume_up</span>
      <input
        type="range"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCurrentVolume(parseInt(event.target.value))
        }
      ></input>
    </div>
  );
}

export default VolumeBtn;
