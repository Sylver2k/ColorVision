import IshiharaImageProps from "interfaces/IshiharaImageProps";
import "./ishiharaimage.css";
function IshiharaImage({ imageId }: IshiharaImageProps) {
  return (
    <img
      className="ishihara-image"
      src={process.env.PUBLIC_URL + "/images/" + imageId + ".png"}
    ></img>
  );
}

export default IshiharaImage;
