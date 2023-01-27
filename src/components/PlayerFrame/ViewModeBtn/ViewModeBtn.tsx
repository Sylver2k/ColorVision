import "./viewmodebtn.css";
import ViewModeProps from "interfaces/ViewModeBtnProps";

/**
 * The user can decide between two viewmodes
 * @param isMultiView if multiview is active
 * @param setIsMultiView sets the state if the video is in multiview
 * @returns view mode button
 */
function ViewMode({ isMultiView, setIsMultiView }: ViewModeProps) {
  return (
    <div className="view-mode tooltip" onClick={() => setIsMultiView(!isMultiView)}>
      <span className="material-symbols-outlined icon-btn">swap_horiz</span>
      <span className="tooltip-text">Switch between the view modes</span>
    </div>
  );
}

export default ViewMode;
