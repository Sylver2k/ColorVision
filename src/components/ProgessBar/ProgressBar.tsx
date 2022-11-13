import './progressbar.css';
import ProgressBarProps from 'interfaces/ProgressBarProps';

/**
 * The user can change the video position (time)
 * @param setTimePosition sets the state if time position has changed
 * @returns the progress bar
 */
function ProgressBar({ setTimePosition }: ProgressBarProps) {
  return (
    <div className="placeholer">
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
