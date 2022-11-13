import './playerframe.css';
import PlayerFrameProps from 'interfaces/PlayerFrameProps';
import ProgressBar from '../ProgessBar/ProgressBar';
import { useState } from 'react';
import PlayBtn from './PlayBtn/PlayBtn';
import VolumeBtn from './VolumeBtn/VolumeBtn';
import ViewMode from './ViewModeBtn/ViewModeBtn';
import Player from './Player/Player';
import TestBtn from '../TestBtn/TestBtn';

/**
 * The frame for the players and settings buttons
 * @param selectedFile default or uploaded file
 * @param colorblindFile the converted file
 * @returns the complete player frame
 */
function PlayerFrame({ selectedFile, colorblindFile }: PlayerFrameProps) {
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isMultiView, setIsMultiView] = useState<boolean>(false);
  const [currentVolume, setCurrentVolume] = useState<number>(50);
  const [timePosition, setTimePosition] = useState<number>(0);
  return (
    <div className="playerframe">
      <div className="viewcontainer">
        {!isMultiView ? (
          <Player
            isPaused={isPaused}
            isColorblindMode={false}
            isMultiView={isMultiView}
            selectedFile={selectedFile}
            currentVolume={currentVolume}
            colorblindFile={colorblindFile}
            timePosition={timePosition}
          />
        ) : (
          <div className="multiview-container">
            <Player
              isPaused={isPaused}
              isColorblindMode={false}
              isMultiView={isMultiView}
              selectedFile={selectedFile}
              currentVolume={currentVolume}
              colorblindFile={colorblindFile}
              timePosition={timePosition}
            />
            <Player
              isPaused={isPaused}
              isColorblindMode={true}
              isMultiView={isMultiView}
              selectedFile={selectedFile}
              currentVolume={currentVolume}
              colorblindFile={colorblindFile}
              timePosition={timePosition}
            />
          </div>
        )}
        <ViewMode isMultiView={isMultiView} setIsMultiView={setIsMultiView} />
        <TestBtn />
      </div>
      <ProgressBar setTimePosition={setTimePosition} />
      <div className="controls">
        <PlayBtn isPaused={isPaused} setIsPaused={setIsPaused} />
        <VolumeBtn setCurrentVolume={setCurrentVolume} />
      </div>
    </div>
  );
}

export default PlayerFrame;
