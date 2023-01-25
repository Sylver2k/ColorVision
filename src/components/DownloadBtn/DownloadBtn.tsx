import './downloadbtn.css';
import DownloadBtnProps from 'interfaces/DownloadBtnProps';

/**
 * The user can download the video
 * @param selectedFile default or uploaded file
 * @returns a button to download the file
 */
function DownloadBtn({ selectedFile, canvasRef, videoRef }: DownloadBtnProps) {
  const capture = () => {
    videoRef.current!.currentTime = 0;
    videoRef.current?.play();
    const recordedChunks:any = [];
    if(canvasRef.current){
      const stream = canvasRef.current.captureStream(3000);
      const mediaRecorder = new MediaRecorder(stream,
          {mimeType: 'video/webm; codecs=vp9'});
      mediaRecorder.ondataavailable =
          event => recordedChunks.push(event.data);
      mediaRecorder.onstop = () => {
        const url = URL.createObjectURL(
            new Blob(recordedChunks, {type: "video/webm"}));
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "video.webm";
        anchor.click();
        window.URL.revokeObjectURL(url);
      }
      mediaRecorder.start();
      window.setTimeout(() => {mediaRecorder.stop();}, videoRef.current!.duration*1000);
    }
  };
  return (
    <div className="download" onClick={() => capture()}>
      Download
    </div>
  );
}

export default DownloadBtn;
