import "./playbtn.css";
import PlayBtnProps from "interfaces/PlayBtnProps";
import { useState } from "react";

/**
 * The user can pause and resume the video
 * @param videoReference a reference to the played video
 * @returns pause button
 */
function PlayBtn({ videoReference }: PlayBtnProps) {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  /**
   *Play the video if it is currently paused or pause it when it is playing
   */
  const pauseVideo = (): void => {
    if (videoReference.current) {
      if (videoReference.current.paused) {
        setIsPaused(false);
        videoReference.current.play();
      } else {
        setIsPaused(true);
        videoReference.current.pause();
      }
    }
  };

  return (
    <>
      <div className="play" onClick={pauseVideo}>
        {isPaused ? (
          <span className="material-symbols-outlined fill-play-btn">
            play_arrow
          </span>
        ) : (
          <span className="material-symbols-outlined">pause</span>
        )}
      </div>
    </>
  );
}

export default PlayBtn;
