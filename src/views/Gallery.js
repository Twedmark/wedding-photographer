import ImageComponent from '../components/ImageComponent'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import './Gallery.css'


function Gallery(){
  const navigate = useNavigate();
  const [gallertState, setGalleryState] = useState(JSON.parse(localStorage.getItem("camera")) || []);

  const listComponents = gallertState.map((galleryItem, index) =>{
      return <ImageComponent deletePicture={ deletePicture } galleryItem={ galleryItem } galleryIndex={ index } key={ index } />
  })

  function deletePicture(indexOfImage){
    let newGallery = Array.from(gallertState);
    newGallery.splice(indexOfImage, 1);
    console.log(gallertState);
    console.log(newGallery);
    localStorage.setItem('camera', JSON.stringify(newGallery));
    setGalleryState(newGallery);
  }

  function toCamera(){
    navigate('/Camera');
  }

  return(
    <section className="gallerySection">
      <section className="cameraBtn" onClick={toCamera}>
      <div><div><div><div><div></div></div></div></div></div>
      </section>
      <section className="header"></section>
      <section className="listSection">
        { listComponents }
      </section>
    </section>
  )
}

export default Gallery;
