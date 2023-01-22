import "./playbtn.css";
import PlayBtnProps from "interfaces/PlayBtnProps";

/**
 * The user can pause and resume the video
 * @param isPaused true if video is paused
 * @param setIsPaused sets the state if the video is paused or not
 * @returns pause button
 */
function PlayBtn({ isPaused, setIsPaused }: PlayBtnProps) {
  return (
    <>
      <div className="play" onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? (
          <span className="material-symbols-outlined fill-play-btn">play_arrow</span>
        ) : (
          <span className="material-symbols-outlined">pause</span>
        )}
      </div>
    </>
  );
}

export default PlayBtn;
