import axios from "axios";
import { useEffect, useState } from "react";
import "./MugshotImages.css"

const MugshotImages = () => {
    const [mugshotImages, setMugshotImages] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/mugshot-images`).then((res) => {
            const data = res.data
            setMugshotImages(data)
        })
    }, [])

    return (  
        <div>
            <p>Mushot Images</p>
            <div className="allImages">
                {
                    mugshotImages.length > 0 && mugshotImages.map((element, index) => {
                        const imagePath = element.slice(50)
                        return <img src={imagePath} key={index} alt=""/>
                    })
                }
            </div>
        </div>
    );
}
 
export default MugshotImages;