import CameraComponent from '../components/CameraComponent'
import { useNavigate } from 'react-router-dom';
import './Camera.css'

function Camera(){
  const navigate = useNavigate();

  function toGallery(){
    navigate('/gallery');
  }

  return(
    <section className="cameraSection">
    <section className="GalleryBtn" onClick={ toGallery }>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </section>

      <CameraComponent />

    </section>
  )
}

export default Camera;
