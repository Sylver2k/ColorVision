import './ishihara.css';
import IshiharaProps from 'interfaces/IshiharaProps';
import BackBtn from '../BackBtn/BackBtn';

/**
 * Pictures to test for colorblindness
 * @param
 * @returns Ishihara Pictures
 */
function Ishihara({}: IshiharaProps) {
  const pictures = [];
  return (
    <>
      <BackBtn />
      <div className="ishihara-picture">Ishihara Picture</div>;
    </>
  );
}

export default Ishihara;
