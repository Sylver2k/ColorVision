import "./playerframe.css";
import PlayerFrameProps from "interfaces/PlayerFrameProps";
import ProgressBar from "../ProgessBar/ProgressBar";
import { useRef, useState } from "react";
import PlayBtn from "./PlayBtn/PlayBtn";
import VolumeBtn from "./VolumeBtn/VolumeBtn";
import ViewMode from "./ViewModeBtn/ViewModeBtn";
import Player from "./Player/Player";
import TestBtn from "../TestBtn/TestBtn";

/**
 * The frame for the players and settings buttons
 * @param selectedFile default or uploaded file
 * @param colorblindFile the converted file
 * @returns the complete player frame
 */
function PlayerFrame({
  selectedFile,
  colorblindFile,
  cvd,
  videoRef,
  canvasRef,
}: PlayerFrameProps) {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMultiView, setIsMultiView] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(50);
  const [timePosition, setTimePosition] = useState<number>(0);
  const [videoPosition, setVideoPosition] = useState<number | undefined>(0);

  return (
    <div className="playercontainer">
      <div className="playerframe">
        <div>
          {!isMultiView ? (
            <Player
              videoRef={videoRef}
              canvasRef={canvasRef}
              isPaused={isPaused}
              isColorblindMode={false}
              isMultiView={isMultiView}
              selectedFile={selectedFile}
              currentVolume={currentVolume}
              colorblindFile={colorblindFile}
              timePosition={timePosition}
              simulatedCVD={cvd}
              setVideoPosition={setVideoPosition}
            />
          ) : (
            <div className="multiview-container">
              <Player
                videoRef={videoRef}
                canvasRef={canvasRef}
                isPaused={isPaused}
                isColorblindMode={false}
                isMultiView={isMultiView}
                selectedFile={selectedFile}
                currentVolume={currentVolume}
                colorblindFile={colorblindFile}
                timePosition={timePosition}
                simulatedCVD={cvd}
                setVideoPosition={setVideoPosition}
              />
              <Player
                videoRef={videoRef}
                canvasRef={canvasRef}
                isPaused={isPaused}
                isColorblindMode={true}
                isMultiView={isMultiView}
                selectedFile={selectedFile}
                currentVolume={currentVolume}
                colorblindFile={colorblindFile}
                timePosition={timePosition}
                simulatedCVD={cvd}
                setVideoPosition={setVideoPosition}
              />
            </div>
          )}
        </div>
        <div className="video-controls">
          <ProgressBar
            setTimePosition={setTimePosition}
            videoPosition={videoPosition}
          />
          <div className="controls">
            <PlayBtn isPaused={isPaused} setIsPaused={setIsPaused} />
            <VolumeBtn setCurrentVolume={setCurrentVolume} />
          </div>
        </div>
      </div>
      <div className="button-container">
        <ViewMode isMultiView={isMultiView} setIsMultiView={setIsMultiView} />
        <TestBtn />
      </div>
    </div>
  );
}

export default PlayerFrame;
