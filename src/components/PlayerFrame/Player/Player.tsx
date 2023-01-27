import './player.css';
import PlayerProps from 'interfaces/PlayerProps';
import { RefObject, useEffect, useRef, useState } from 'react';

/**
 * Put here all the video logic except converting for colorblind
 * @param isPaused if the video is in pause mode
 * @param isColorblindMode if the player should be in colorblind mode
 * @param isMultiView if multiview is active
 * @param selectedFile default or uploaded file
 * @param currentVolume the current volume
 * @param colorblindFile the converted file
 * @param timePosition current timestamp of the video
 * @param setVideoPosition sets the video position to pass to progress bar later
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
  simulatedCVD,
  setVideoPosition,
  canvasRef,
  videoRef
}: PlayerProps) {
  /**
   * TODO: Don't trigger on mount
   */
  //const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    pauseVideo();
  }, [isPaused]);
  useEffect(() => {
    changeVideoVolume(currentVolume);
  }, [currentVolume]);
  useEffect(() => {
    changeVideoPosition(timePosition);
  }, [timePosition]);
  useEffect(() => {
    initializeRendering();
  }, []);
  useEffect(() => {
    getVideoDuration(videoRef);
  }, [videoRef.current?.duration]);
  useEffect(() => {
    handleCVDChange();
  }, [simulatedCVD])

  const getVideoDuration = (
    videoRef: RefObject<HTMLVideoElement>
  ): number | undefined => {
    if (videoRef.current) {
      return videoRef.current?.duration;
    }
  };
  
  const pauseVideo = (): void => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };
  const changeVideoVolume = (currentVolume: number): void => {
    if (videoRef.current) {
      videoRef.current.volume = currentVolume / 100;
    }
  };

  const changeVideoPosition = (timePosition: number): void => {
    if (videoRef.current) {
      const duration = getVideoDuration(videoRef);
      if (duration) {
        videoRef.current.currentTime = (duration / 100) * timePosition;
      }
    }
  };

  const cancelAllAnimationFrames = () => {
    requestedAnimationFramesIDs.forEach(id => {
      window.cancelAnimationFrame(id);
    });
  }

  const handleCVDChange = () => {
    if (isColorblindMode) {
      const oldCanvas = document.getElementById("colorBlindCanvas");
      const newCanvas = document.createElement("canvas");
      newCanvas.setAttribute("id", "colorBlindCanvas");
      oldCanvas?.parentNode?.replaceChild(newCanvas, oldCanvas);
      cancelAllAnimationFrames();
      initializeRendering();
    }
  };

  /**
   * Video-Rendering Section
   */

  const VIDEO_WIDTH = 1100;
  const VIDEO_HEIGHT = 619;


  interface MetaData {
    videoWidth: HTMLVideoElement['videoWidth'];
    videoHeight: HTMLVideoElement['videoHeight'];
  }

  let video: HTMLVideoElement;
  let colorBlindCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let requestedAnimationFramesIDs: number[] = []

  let metaData: MetaData;

  const initializeRendering = (): void => {
    video = document.getElementById('video') as HTMLVideoElement;

    video.addEventListener('loadeddata', () => {
      metaData = {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      };
    });

    if (isColorblindMode) {
      colorBlindCanvas = document.getElementById(
        'colorBlindCanvas'
      ) as HTMLCanvasElement;
      ctx = colorBlindCanvas.getContext('2d', {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;
      renderVideoIntoCanvas();
      applyColorFilter();
    }
  };

  const renderVideoIntoCanvas = (): void => {
    video.width = VIDEO_WIDTH / 2;
    colorBlindCanvas.width = VIDEO_WIDTH / 2;
    colorBlindCanvas.height = VIDEO_HEIGHT / 2;
    function updateFrame() {
      applyColorFilter();
      const requestID = requestAnimationFrame(updateFrame);
      requestedAnimationFramesIDs.push(requestID);
    }
    const initialRequestID = requestAnimationFrame(updateFrame);
    requestedAnimationFramesIDs.push(initialRequestID);
  };

  /**
   * Colorblind Simulation Section
   */

  interface ColorMatrix {
    red: number[];
    green: number[];
    blue: number[];
  }

  const protanopia = {
    red: [0.567, 0.433, 0],
    green: [0.558, 0.442, 0],
    blue: [0, 0.242, 0.758],
  };

  const protanomaly = {
    // Severity = 1
    red: [0.152286, 1.052583, -0.204868],
    green: [0.114503, 0.786281, 0.099216],
    blue: [-0.003882, -0.048116, 1.051998],
  };

  const deuteranopia = {
    red: [0.625, 0.375, 0],
    green: [0.7, 0.3, 0],
    blue: [0, 0.3, 0.7],
  };

  const deuteranomaly = {
    // Severity 1
    red: [0.367322, 0.860646, -0.227968],
    green: [0.280085, 0.672501, 0.047413],
    blue: [-0.01182, 0.04294, 0.968881],
  };

  const tritanopia = {
    red: [0.95, 0.05, 0],
    green: [0, 0.433, 0.567],
    blue: [0, 0.475, 0.525],
  };

  const tritanomaly = {
    // Severtity = 1
    red: [1.255528, -0.076749, -0.178779],
    green: [-0.078411, 0.930809, 0.147602],
    blue: [0.004733, 0.691367, 0.3039],
  };

  const getColorMatrixForBlindness = (blindness: string): ColorMatrix => {
    switch (blindness) {
      case 'Protanopia':
        return protanopia;
      case 'Protanomaly':
        return protanomaly;
      case 'Deuteranopia':
        return deuteranopia;
      case 'Deuteranomaly':
        return deuteranomaly;
      case 'Tritanopia':
        return tritanopia;
      case 'Tritanomaly':
        return tritanomaly;
      default:
        return { red: [1, 0, 0], green: [0, 1, 0], blue: [0, 0, 1] };
    }
  };

  //TODO fix resize artefakt am anfang

  const applyColorFilter = (): void => {
    ctx.drawImage(video, 0, 0, colorBlindCanvas.width, colorBlindCanvas.height);
    const imageData = ctx.getImageData(
      0,
      0,
      colorBlindCanvas.width,
      colorBlindCanvas.height
    );

    const data = imageData.data;
    const colormatrix = getColorMatrixForBlindness(simulatedCVD);

    for (let i = 0; i < data.length; i += 4) {
      let red = data[i],
        green = data[i + 1],
        blue = data[i + 2];

      data[i] = Math.round(
        colormatrix.red[0] * red +
          colormatrix.red[1] * green +
          colormatrix.red[2] * blue
      );
      data[i + 1] = Math.round(
        colormatrix.green[0] * red +
          colormatrix.green[1] * green +
          colormatrix.green[2] * blue
      );
      data[i + 2] = Math.round(
        colormatrix.blue[0] * red +
          colormatrix.blue[1] * green +
          colormatrix.blue[2] * blue
      );
    }
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className={`${isMultiView ? 'player multiview' : 'player'}`}>
      <div>
        {isColorblindMode ? (
          <canvas ref={canvasRef} id="colorBlindCanvas"></canvas>
        ) : (
          <video key={selectedFile} ref={videoRef} id="video" width={VIDEO_WIDTH} controls preload="metadata">
            <source src={selectedFile} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default Player;
