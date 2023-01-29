import "./downloadbtn.css";
import DownloadBtnProps from "interfaces/DownloadBtnProps";
import { useRef } from "react";

/**
 * The user can download the video
 * @param canvasRef a reference to the canvas from where to download the video
 * @param videoRef a reference to the video
 * @returns the button to download the filtered video
 */
function DownloadBtn({ canvasRef, videoRef }: DownloadBtnProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  /**
   * Reads a stream from the canvas, saves is as webm file and downloads its
   */
  const capture = (): void => {
    videoRef.current!.currentTime = 0;
    videoRef.current?.play();
    const recordedChunks: Blob[] = [];
    if (canvasRef.current) {
      const stream: MediaStream = canvasRef.current.captureStream(30);
      const mediaRecorder: MediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9",
      });
      mediaRecorder.ondataavailable = (event: BlobEvent) =>
        recordedChunks.push(event.data);
      mediaRecorder.onstop = () => {
        const url: string = URL.createObjectURL(
          new Blob(recordedChunks, { type: "video/webm" })
        );
        if (anchorRef.current) {
          anchorRef.current.href = url;
          anchorRef.current.download = "video.webm";
          anchorRef.current.click();
        }
        window.URL.revokeObjectURL(url);
      };
      mediaRecorder.start();
      window.setTimeout(() => {
        mediaRecorder.stop();
      }, videoRef.current!.duration * 1000);
    }
  };
  return (
    <>
      <div className="button-branding side-tooltip" onClick={capture}>
        Download
        <span className="side-tooltip-text">
          Download works only in split screen mode
        </span>
      </div>
      <a className="download" ref={anchorRef}></a>
    </>
  );
}

export default DownloadBtn;
