import { useState } from 'react';
import './App.css';
import Details from './Details';
import MugshotImages from './MugshotImages';
import SimilarImages from './SimilarImages';
import UploadImage from './UploadImage';
// 31
function App() {
  const [imageCount, setImageCount] = useState()
  const [selectedOption, setSelectedOption] = useState(null)

  const handleClick = (option) => setSelectedOption(option)

  return (
    <div className="App">
      <h1>Sketch2Face</h1>
      <Details imageCount={imageCount} setImageCount={setImageCount} />

      <div className="Options">
        <button className="Option" onClick={()=>handleClick("upload")}>Upload</button>
        <button className="Option" onClick={()=>handleClick("similar")}>Find Similar</button>
        <button className="Option" onClick={()=>handleClick("display")}>Display All</button>
      </div>
      {
        (selectedOption === "upload") ? 
        <UploadImage imageCount={imageCount} setImageCount={setImageCount} /> :
        (selectedOption === "similar") ?
        <SimilarImages /> : <MugshotImages />
      }
    </div>
  );
}

export default App;
