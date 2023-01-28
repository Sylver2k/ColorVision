import "./ishihara.css";
import { ChangeEvent, useRef, useState } from "react";
import solutions from "./solutions.json";
import IshiharaImage from "./IshiharaImage/IshiharaImage";
import ResultArea from "./ResultArea/ResultArea";
import { ISolution } from "interfaces/IshiharaImageProps";
/**
 * Pictures to test for colorblindness
 * @returns Ishihara Pictures
 */

function Ishihara() {
  const [imageId, setImageId] = useState<number>(1);
  const [guessedValues] = useState<number[]>([]);
  const [blindness, setBlindness] = useState<string[]>();
  const inputRef = useRef<HTMLInputElement>(null);
  let blindnesses: string[] = [];
  const [message, setMessage] = useState<string>("");

  /**
   * Creates an array of color deficiencies
   * @param guessedValues the entered numbers by the user
   * @param solutions the solutions json
   */
  const calculateBlindnesses = (
    guessedValues: number[],
    solutions: ISolution[]
  ): void => {
    solutions.map((elm: ISolution, i: number) => {
      if (solutions.length - 1 !== i) {
        if (elm.solution !== guessedValues[i]) {
          if (elm.type === "string") {
            blindnesses.push(elm.type);
          } else {
            blindnesses = blindnesses.concat(elm.type);
          }
        }
      } else {
        if (elm.matches === guessedValues[i]) {
          blindnesses = blindnesses.concat(elm.type);
        }
      }
    });
  };
  /**
   * Sets the color deficiency with the highest occurence as state
   * @param blindnesses array of color deficiencies
   */
  const determineBlindness = (blindnesses: string[]): void => {
    const occurrences: any = blindnesses.reduce((acc: any, curr: any) => {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    const highest: string[] = Object.keys(occurrences).filter((x) => {
      return occurrences[x] == Math.max.apply(null, Object.values(occurrences));
    });
    setBlindness(highest);
  };

  /**
   * Sets the current user input as state
   * @param event user input
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };
  /**
   * Pushes the input to an array and increments counter so the next image is displayed, at the last element
   * it will call above functions to evaluate the color deficiency of the user
   */
  const handleClick = (): void => {
    if (imageId < solutions.length) {
      guessedValues.push(Number(message));
      setImageId(imageId + 1);
    } else {
      guessedValues.push(Number(message));
      calculateBlindnesses(guessedValues, solutions);
      determineBlindness(blindnesses);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="ishihara-container">
      <div className="ishihara-tutorialframe">
        <h1 className="ishihara-header">Ishihara Test</h1>
        <div className="ishihara-tutorial">
          The test can only determine protanomaly, protanopia and deuteranopia
          color blindness. You have to enter the number(s) for each plate you
          can see. If you don't see anything just click to the next button.
          There will be 9 plates.
        </div>
      </div>
      <IshiharaImage imageId={imageId} />
      {!blindness ? (
        <div className="ishihara-controls">
          <input
            type="text"
            className="ishihara-input"
            ref={inputRef}
            onChange={handleChange}
            placeholder="Please enter a number"
          />
          <div className="next-btn" onClick={handleClick}>
            Next
          </div>
        </div>
      ) : (
        <ResultArea blindness={blindness} />
      )}
    </div>
  );
}

export default Ishihara;
