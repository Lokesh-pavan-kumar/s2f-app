import axios from "axios";
import "./UploadImage.css"
import { useEffect, useRef, useState } from "react";

const UploadImage = (props) => {
    const [selectedFile, setSelectedFile] = useState("default.png")
    const [displayImage, setDisplayImage] = useState(selectedFile)

    const [count, setCount] = useState(null)
    const firstUpdate = useRef(true);

    const imageCount = props.imageCount
    const setImageCount = props.setImageCount

    const formData = new FormData()

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
        setDisplayImage(URL.createObjectURL(event.target.files[0]))
    }

    const handleClick = () => {
        setCount(count + 1)
        setImageCount(imageCount + 1)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        
        formData.append('image', selectedFile)

        axios({
            method: 'post',
            url: 'http://localhost:8000/upload-image/',
            data: formData
        }).then(() => {
            alert("Image Uploaded")
            setDisplayImage(null)
        })
    }, [count])

    return (  
        <div className="uploadContainer">
            <div className="leftBox">
                {
                    selectedFile && <img src={displayImage} width="300vw" alt="" />
                }
            </div>
            <div className="rightBox">
                <div>
                    <input type="file" onChange={handleChange} />
                    <br/>
                    <button onClick={handleClick}>Upload File</button>  
                </div>
            </div>
        </div>
    );
}

export default UploadImage;

