import './viewmodebtn.css';
import ViewModeProps from 'interfaces/ViewModeBtnProps';

/**
 * The user can decide between two viewmodes
 * @param isMultiView if multiview is active
 * @param setIsMultiView sets the state if the video is in multiview
 * @returns view mode button
 */
function ViewMode({ isMultiView, setIsMultiView }: ViewModeProps) {
  return (
    <div className="view-mode" onClick={() => setIsMultiView(!isMultiView)}>
      View mode
    </div>
  );
}

export default ViewMode;
