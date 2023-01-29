import "./progressbar.css";
import ProgressBarProps from "interfaces/ProgressBarProps";

/**
 * The user can change the video position (time)
 * @param setTimePosition sets the state if time position has changed
 * @param videoPosition passes the video position for the progress bar as value
 * @returns the progress bar
 */
function ProgressBar({ setTimePosition, videoPosition }: ProgressBarProps) {
  return (
    <div>
      <input
        type="range"
        className="progressbar"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setTimePosition(parseInt(event.target.value))
        }
      ></input>
    </div>
  );
}

export default ProgressBar;
