import { Dispatch, SetStateAction } from "react";

interface ViewModeBtnProps {
  isMultiView: boolean;
  setIsMultiView:Dispatch<SetStateAction<boolean>>
}
export default ViewModeBtnProps;
