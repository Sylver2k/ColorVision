import "./playerframe.css";
import PlayerFrameProps from "interfaces/PlayerFrameProps";
import ProgressBar from "../ProgessBar/ProgressBar";
import { useState } from "react";
import PlayBtn from "./PlayBtn/PlayBtn";
import VolumeBtn from "./VolumeBtn/VolumeBtn";
import ViewMode from "./ViewModeBtn/ViewModeBtn";
import Player from "./Player/Player";
import TestBtn from "../TestBtn/TestBtn";

/**
 * The frame for the players and settings buttons
 * @param selectedFile default or uploaded file
 * @param colorblindFile the converted file
 * @param cvd the selected color filter
 * @param videoRef a reference to the video
 * @param canvasRef a reference to the canvas
 * @returns the complete player frame
 */
function PlayerFrame({
  selectedFile,
  cvd,
  videoRef,
  canvasRef,
}: PlayerFrameProps) {
  const [isMultiView, setIsMultiView] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(50);
  const [timePosition, setTimePosition] = useState<number>(0);
  const [videoPosition] = useState<number | undefined>(0);

  return (
    <div className="playercontainer">
      <div className="playerframe">
        <div>
          {!isMultiView ? (
            <Player
              videoRef={videoRef}
              canvasRef={canvasRef}
              isColorblindMode={false}
              isMultiView={isMultiView}
              selectedFile={selectedFile}
              currentVolume={currentVolume}
              timePosition={timePosition}
              simulatedCVD={cvd}
            />
          ) : (
            <div className="multiview-container">
              <Player
                videoRef={videoRef}
                canvasRef={canvasRef}
                isColorblindMode={false}
                isMultiView={isMultiView}
                selectedFile={selectedFile}
                currentVolume={currentVolume}
                timePosition={timePosition}
                simulatedCVD={cvd}
              />
              <Player
                videoRef={videoRef}
                canvasRef={canvasRef}
                isColorblindMode={true}
                isMultiView={isMultiView}
                selectedFile={selectedFile}
                currentVolume={currentVolume}
                timePosition={timePosition}
                simulatedCVD={cvd}
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
            <PlayBtn videoReference={videoRef} />
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
