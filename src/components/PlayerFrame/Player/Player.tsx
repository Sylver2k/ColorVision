import './player.css';
import PlayerProps from 'interfaces/PlayerProps';
import { useEffect } from 'react';

/**
 * Put here all the video logic except converting for colorblind
 * @param isPaused if the video is in pause mode
 * @param isColorblindMode if the player should be in colorblind mode
 * @param isMultiView if multiview is active
 * @param selectedFile default or uploaded file
 * @param currentVolume the current volume
 * @param colorblindFile the converted file
 * @param timePosition current timestamp of the video
 * @returns one or two player
 */
function Player({
  isPaused,
  isColorblindMode,
  isMultiView,
  selectedFile,
  currentVolume,
  colorblindFile,
  timePosition,
}: PlayerProps) {
  /**
   * TODO: Don't trigger on mount
   */
  useEffect(() => {
    pauseVideo();
  }, [isPaused]);
  useEffect(() => {
    changeVideoVolume(currentVolume);
  }, [currentVolume]);
  useEffect(() => {
    changeVideoPosition(timePosition);
  }, [timePosition]);

  const pauseVideo = (): void => {
    /**
     * TODO: Pause video implementation
     */
  };
  const changeVideoVolume = (currentVolume: number): void => {
    /**
     * TODO: Change volume implementation
     */
  };

  const changeVideoPosition = (timePosition: number): void => {
    /**
     * TODO: Change time position implementation
     */
  };

  return (
    <div className={`${isMultiView ? 'player multiview' : 'player'}`}>
      <div className="feedback">
        {isColorblindMode ? <p>Colorblind player</p> : <p>Normal player</p>}
        {isPaused && <p> Paused</p>}
        {<p>Volume: {currentVolume}</p>}
        {<p>Time: {timePosition} </p>}
      </div>
    </div>
  );
}

export default Player;
