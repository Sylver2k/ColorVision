import "./simulatebtn.css";
import SimulateBtnProps from "interfaces/SimulateBtnProps";
import { useNavigate } from "react-router-dom";

/**
 * Return to video page
 * @returns button to return to video page
 */
function SimulateBtn({}: SimulateBtnProps) {
  const history = useNavigate();
  const pageTarget = "/";
  return (
    <div className="back" onClick={() => history(pageTarget)}>
      Simulate your deficiency now
    </div>
  );
}

export default SimulateBtn;
