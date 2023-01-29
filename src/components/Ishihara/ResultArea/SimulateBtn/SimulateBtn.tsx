import "./simulatebtn.css";
import { NavigateFunction, useNavigate } from "react-router-dom";
import SimulateBtnProps from "interfaces/SimulateBtnProps";

/**
 * Return to simulation page
 * @returns button to return to simulation page
 */
function SimulateBtn({ hasCVD }: SimulateBtnProps) {
  const history: NavigateFunction = useNavigate();
  const pageTarget: string = "/";
  return (
    <div className="back" onClick={() => history(pageTarget)}>
      Simulate {hasCVD ? "your" : "a"} deficiency now
    </div>
  );
}

export default SimulateBtn;
