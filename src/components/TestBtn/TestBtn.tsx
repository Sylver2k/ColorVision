import './testbtn.css';
import TestBtnProps from 'interfaces/TestBtnProps';
import { useNavigate } from 'react-router-dom';

/**
 * Change to colortest page
 * @returns Button to go to the colortest page
 */
function TestBtn({}: TestBtnProps) {
  const history = useNavigate();
  const pageTarget = '/colortest';
  return (
    <div className="test" onClick={() => history(pageTarget)}>
      Colortest
    </div>
  );
}

export default TestBtn;
