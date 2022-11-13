import './backbtn.css';
import BackBtnProps from 'interfaces/BackBtnProps';
import { useNavigate } from 'react-router-dom';

/**
 * Return to video page
 * @returns button to return to video page
 */
function BackBtn({}: BackBtnProps) {
  const history = useNavigate();
  const pageTarget = '/';
  return (
    <div className="back" onClick={() => history(pageTarget)}>
      Back
    </div>
  );
}

export default BackBtn;
