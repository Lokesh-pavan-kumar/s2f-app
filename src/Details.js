import axios from "axios";
import { useEffect } from "react";

const Details = (props) => {
    const imageCount = props.imageCount
    const setImageCount = props.setImageCount

    useEffect(() => {
        axios.get(`http://localhost:8000/details`).then((res) => {
          const data = res.data.image_count
          setImageCount(data)
        })
    }, [setImageCount])

    return (
        <div>
            <h2>Mugshot Size : {imageCount}</h2>
        </div>
    );
}

export default Details;
