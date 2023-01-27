import ResultAreaProps from "interfaces/ResultAreaProps";
import SimulateBtn from "./SimulateBtn/SimulateBtn";
import "./resultarea.css";
function ResultArea({ blindness }: ResultAreaProps) {
  const getUserResult = (blindness: string[]): string => {
    if (blindness.length < 1) {
      return "Your color sight seems fine.";
    } else if (blindness.length < 2) {
      return (
        "You may have a " +
        blindness[0].toLowerCase() +
        " type color deficiency."
      );
    } else {
      if (blindness instanceof Array) {
        let blindnessTypes = "";
        blindness.map((elm) => {
          blindnessTypes += elm + " ";
        });
        blindnessTypes = blindnessTypes.trim().replaceAll(" ", "/");
        return (
          "You may have a " +
          blindnessTypes.toLowerCase() +
          " type color deficiency."
        );
      }
    }
    return "";
  };
  return (
    <div className="result-frame">
      <p className="ishihara-result">{getUserResult(blindness)}</p>
      <SimulateBtn />
    </div>
  );
}

export default ResultArea;
