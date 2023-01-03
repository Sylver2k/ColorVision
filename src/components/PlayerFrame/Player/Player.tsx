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
  useEffect(() => {
    loadVariables()
  }, [])

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


   /**
   * Video-Rendering Section
   */
  
  interface MetaData {
    videoWidth: HTMLVideoElement["videoWidth"],
    videoHeight: HTMLVideoElement["videoHeight"],
  }

  let video: HTMLVideoElement;
  let colorBlindCanvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let metaData: MetaData;

  const loadVariables = (): void => {
    video = document.getElementById("video") as HTMLVideoElement;

    video.addEventListener('loadeddata', () => {
      metaData = {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      }
    });

    if (isColorblindMode) {
      colorBlindCanvas = document.getElementById("colorBlindCanvas") as HTMLCanvasElement;
      ctx = colorBlindCanvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
      renderVideoIntoCanvas();
      applyColorFilter();
    }
  }

  const renderVideoIntoCanvas = (): void => {
    video.addEventListener("loadeddata", () => {
      video.width = metaData.videoWidth / 2
      colorBlindCanvas.width = metaData.videoWidth / 2;
      colorBlindCanvas.height = metaData.videoHeight / 2; 
      function updateFrame() {
        applyColorFilter();
        requestAnimationFrame(updateFrame);
      }
      requestAnimationFrame(updateFrame);
    });
  }


  /**
   * Colorblind Simulation Section
  */

  interface ColorMatrix {
    red: number[],
    green: number[],
    blue: number[],
  }

  const protanopia = {
    red: [0.567, 0.433, 0],
    green: [0.558, 0.442, 0],
    blue: [0, 0.242, 0.758],
  }

  const protanomaly = { // Severity = 1
    red: [0.152286, 1.052583, -0.204868],
    green: [0.114503, 0.786281, 0.099216],
    blue: [-0.003882, -0.048116, 1.051998],
  }

  const deuteranopia = {
    red: [0.625, 0.375, 0],
    green: [0.7, 0.3, 0],
    blue: [0, 0.3, 0.7],
  }

  const tritanopia = {
    red: [0.95, 0.05, 0],
    green: [0, 0.433, 0.567],
    blue: [0, 0.475, 0.525],
  }

  const getColorMatrixForBlindness = (blindness: string): ColorMatrix => {
    switch(blindness) {
      case "Protanopia":
        return protanopia;
      case "Protanomaly":
        return protanomaly;
      case "Deuteranopia":
        return deuteranopia;
      case "Tritanopia":
        return tritanopia;
      default:
        return { red: [1,0,0], green: [0,1,0], blue: [0,0,1] }
    }
  }


  const applytestEffectSepia = (imageData: ImageData): void => {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i],
        green = data[i + 1],
        blue = data[i + 2];

      data[i] = Math.min(
        Math.round(0.393 * red + 0.769 * green + 0.189 * blue),
        255
      );
      data[i + 1] = Math.min(
        Math.round(0.349 * red + 0.686 * green + 0.168 * blue),
        255
      );
      data[i + 2] = Math.min(
        Math.round(0.272 * red + 0.534 * green + 0.131 * blue),
        255
      );
    }
    ctx.putImageData(imageData, 0, 0);
  };

  //TODO fix resize artefakt am anfang 

  const applyColorFilter = (): void => {
    ctx.drawImage(video, 0, 0, colorBlindCanvas.width, colorBlindCanvas.height);
    const imageData = ctx.getImageData(0, 0, colorBlindCanvas.width, colorBlindCanvas.height);

    const data = imageData.data;
    const colormatrix = getColorMatrixForBlindness("Protanopia"); //Should be coming from the 'blindess selector' component
    
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i],
        green = data[i + 1],
        blue = data[i + 2];

      data[i] = Math.round(colormatrix.red[0] * red + colormatrix.red[1] * green + colormatrix.red[2] * blue);
      data[i + 1] = Math.round(colormatrix.green[0] * red + colormatrix.green[1] * green + colormatrix.green[2] * blue);
      data[i + 2] = Math.round(colormatrix.blue[0] * red + colormatrix.blue[1] * green + colormatrix.blue[2] * blue);
    }
    ctx.putImageData(imageData, 0, 0);
  }

  return (
    <div className={`${isMultiView ? "player multiview" : "player"}`}>
      <div>
        {isColorblindMode ? (
          <canvas id="colorBlindCanvas"></canvas>
        ) : (
          <video id="video" controls>
            <source src={selectedFile} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default Player;
