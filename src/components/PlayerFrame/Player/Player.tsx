import "./player.css";
import PlayerProps from "interfaces/PlayerProps";
import { RefObject, useEffect, useRef } from "react";
import colorfilters from "./colorfilters.json";

/**
 * Put here all the video logic except converting for colorblind
 * @param isColorblindMode if the player should be in colorblind mode
 * @param isMultiView if multiview is active
 * @param selectedFile default or uploaded file
 * @param currentVolume the current volume
 * @param timePosition current timestamp of the video
 * @param simulatedCVD the selected color filter
 * @param canvasRef a reference to the canvas
 * @param videoRef a reference to the video
 * @returns one or two player
 */
function Player({
  isColorblindMode,
  isMultiView,
  selectedFile,
  currentVolume,
  timePosition,
  simulatedCVD,
  canvasRef,
  videoRef,
}: PlayerProps) {
  /**
   * Use effects will be triggered when dependency array changes individually
   */
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
    handleRerendering();
  }, [simulatedCVD]);
  useEffect(() => {
    handleNewFile();
  }, [selectedFile])

  /**
   * Get the duration of the video
   * @param videoRef reference to the video
   * @returns duration of the video
   */
  const getVideoDuration = (
    videoRef: RefObject<HTMLVideoElement>
  ): number | undefined => {
    if (videoRef.current) {
      return videoRef.current?.duration;
    }
  };

  /**
   * Changes the video volume
   * @param currentVolume selected volume from the slider
   */
  const changeVideoVolume = (currentVolume: number): void => {
    if (videoRef.current) {
      videoRef.current.volume = currentVolume / 100;
    }
  };

  /**
   * The user can drag the progress bar to a video position
   * @param timePosition selected position of the slider
   */
  const changeVideoPosition = (timePosition: number): void => {
    if (videoRef.current) {
      const duration = getVideoDuration(videoRef);
      if (duration) {
        videoRef.current.currentTime = (duration / 100) * timePosition;
      }
    }
  };

  /**
   * Cancels the animation frames
   */
  const cancelAllAnimationFrames = (): void => {
    requestedAnimationFramesIDs.forEach((id) => {
      window.cancelAnimationFrame(id);
    });
  };

  /**
   * Rerender canvas to mirror filter changes
   */
  const handleRerendering = (): void => {
    if (isColorblindMode) {
      canvasRef.current?.parentNode?.replaceChild(
        canvasRef.current,
        canvasRef.current
      );
      // force canvas to re-render to mirror cvd changes
      cancelAllAnimationFrames();
      initializeRendering();
    }
  };

  const handleNewFile = ()  => {
    if(isMultiView) {
      videoRef.current!.width = VIDEO_WIDTH / 2;
      videoRef.current!.height = VIDEO_HEIGHT / 2;
      handleRerendering();
    }
  }

  /**
   * Video-Rendering Section
   */

  const VIDEO_WIDTH: number = 1100;
  const VIDEO_HEIGHT: number = 619;

  interface MetaData {
    videoWidth: HTMLVideoElement["videoWidth"];
    videoHeight: HTMLVideoElement["videoHeight"];
  }

  let video: HTMLVideoElement;
  let ctx: CanvasRenderingContext2D;

  let requestedAnimationFramesIDs: number[] = [];

  let metaData: MetaData;

  /**
   * Renders video into the canvas and applies the color filter
   */
  const initializeRendering = (): void => {
    video = document.getElementById("video") as HTMLVideoElement;

    video.addEventListener("loadeddata", () => {
      metaData = {
        videoWidth: video.videoWidth,
        videoHeight: video.videoHeight,
      };
    });

    if (isColorblindMode) {
      ctx = canvasRef.current?.getContext("2d", {
        willReadFrequently: true,
      }) as CanvasRenderingContext2D;
      renderVideoIntoCanvas();
      applyColorFilter();
    }
  };

  /**
   * Updates each frame with the filtering
   */
  const renderVideoIntoCanvas = (): void => {
    video.width = VIDEO_WIDTH / 2;
    if (canvasRef.current) {
      canvasRef.current.width = VIDEO_WIDTH / 2;
      canvasRef.current.height = VIDEO_HEIGHT / 2;
    }

    function updateFrame() {
      applyColorFilter();
      const requestID: number = requestAnimationFrame(updateFrame);
      requestedAnimationFramesIDs.push(requestID);
    }
    const initialRequestID: number = requestAnimationFrame(updateFrame);
    requestedAnimationFramesIDs.push(initialRequestID);
  };

  /**
   * Defines the colorfilters json
   */
  interface ColorMatrix {
    red: number[];
    green: number[];
    blue: number[];
  }

  /**
   * Returns the corresponding filter for the color deficiency
   * @param blindness selected filtering
   * @param colorfilters colorfilters in json
   * @returns
   */
  const getColorMatrixForBlindness = (
    blindness: string,
    colorfilters: ColorMatrix[]
  ): ColorMatrix => {
    switch (blindness) {
      case "Protanopia":
        return colorfilters[0];
      case "Protanomaly":
        return colorfilters[1];
      case "Deuteranopia":
        return colorfilters[2];
      case "Deuteranomaly":
        return colorfilters[3];
      case "Tritanopia":
        return colorfilters[4];
      case "Tritanomaly":
        return colorfilters[5];
      default:
        return colorfilters[6];
    }
  };

  /**
   * Applies the color filtering to the images
   */
  const applyColorFilter = (): void => {
    if (canvasRef.current) {
      ctx.drawImage(
        video,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData: ImageData = ctx.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const data: any = imageData.data;
      const colormatrix: ColorMatrix = getColorMatrixForBlindness(
        simulatedCVD,
        colorfilters
      );

      for (let i: number = 0; i < data.length; i += 4) {
        let red: number = data[i],
          green: number = data[i + 1],
          blue: number = data[i + 2];

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
    }
  };

  return (
    <div className={`${isMultiView ? "player multiview" : "player"}`}>
      <div>
        {isColorblindMode ? (
          <canvas ref={canvasRef} id="colorBlindCanvas"></canvas>
        ) : (
          <video
            key={selectedFile}
            ref={videoRef}
            id="video"
            width={VIDEO_WIDTH}
            controls
            preload="metadata"
          >
            <source src={selectedFile} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}

export default Player;
