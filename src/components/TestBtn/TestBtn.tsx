import "./testbtn.css";
import TestBtnProps from "interfaces/TestBtnProps";
import { useNavigate } from "react-router-dom";

/**
 * Change to colortest page
 * @returns Button to go to the colortest page
 */
function TestBtn({}: TestBtnProps) {
  const history = useNavigate();
  const pageTarget = "/colortest";
  return (
    <div className="test tooltip" onClick={() => history(pageTarget)}>
      <span className="material-symbols-outlined icon-btn">quiz</span>
      <span className="tooltip-text">Test yourself for color vision deficiency</span>
    </div>
  );
}

export default TestBtn;
