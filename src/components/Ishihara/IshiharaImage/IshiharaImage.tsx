import IshiharaImageProps from "interfaces/IshiharaImageProps";
import "./ishiharaimage.css";
/**
 *
 * @param imageId to get the correct image from the /images folder
 * @returns the correct image
 */
function IshiharaImage({ imageId }: IshiharaImageProps) {
  return (
    <img
      className="ishihara-image"
      src={process.env.PUBLIC_URL + "/images/" + imageId + ".png"}
    ></img>
  );
}

export default IshiharaImage;
