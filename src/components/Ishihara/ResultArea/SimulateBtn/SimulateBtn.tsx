import "./simulatebtn.css";
import { NavigateFunction, useNavigate } from "react-router-dom";

/**
 * Return to simulation page
 * @returns button to return to simulation page
 */
function SimulateBtn() {
  const history: NavigateFunction = useNavigate();
  const pageTarget: string = "/";
  return (
    <div className="back" onClick={() => history(pageTarget)}>
      Simulate your deficiency now
    </div>
  );
}

export default SimulateBtn;
