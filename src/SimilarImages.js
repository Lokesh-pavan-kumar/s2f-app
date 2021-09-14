import axios from "axios"
import "./SimilarImages.css"
import { useEffect, useRef, useState } from "react"

const SimilarImages = () => {

    const [selectedFile, setSelectedFile] = useState("default.png")
    const [displaySketch, setDisplaySketch] = useState(selectedFile)
    const [similarImages, setSimilarImages] = useState([])

    const [count, setCount] = useState(null)
    const firstUpdate = useRef(true);

    const formData = new FormData()

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
        setDisplaySketch(URL.createObjectURL(event.target.files[0]))
    }

    const handleClick = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        var strategy = 'normal'
        var num_matches = 5

        formData.append('image', selectedFile)
        
        const config = {
            params: {
                strategy,
                num_matches,
            },
        }
        axios.post(`http://localhost:8000/get-similar/`, formData, config).then((res) => {
            setSimilarImages(res.data)
            console.log(res.data)
        })
    }, [count])

    return (  
        <div>
            <div>
                {
                    selectedFile && <img src={displaySketch} width="200vw" alt="" />
                }
            </div>
            <div>
                <input type="file" onChange={handleChange} />
                <button onClick={handleClick}>Get Similar</button>
            </div>

            <div className="similarImages"> 
                {
                    similarImages.length > 0 && similarImages.map((element, index) => {
                        const imagePath = element[1].slice(54)
                        return <img src={imagePath} key={index} alt=""/>
                    })
                }
            </div>
        </div>
    );
}

export default SimilarImages;
