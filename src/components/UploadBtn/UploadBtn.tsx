import UploadBtnProps from 'interfaces/UploadBtnProps';
import React from "react";

/**
 * The user can upload their own video
 * @param setSelectedFile sets the state when  files were uploaded
 * @returns upload button
 */
/**
 * The user can upload their own video
 * @param setSelectedFile sets the state when  files were uploaded
 * @returns upload button
 */
function UploadBtn({ setSelectedFile }: UploadBtnProps) {

    return (
        <input type="file" className="upload" onChange={(event:any) => {setSelectedFile(URL.createObjectURL(event.target.files[0]))}}>
        </input>
    )
}

export default UploadBtn;
