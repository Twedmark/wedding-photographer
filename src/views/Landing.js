import { useNavigate } from 'react-router-dom';

function Landing(){
const navigate = useNavigate();

function toGallery(){
  navigate('/gallery');
}

function toCamera(){
  navigate('/camera');
}

  return(
    <section>
      <h1>Landing</h1>
      <button onClick={toCamera}>Ta en bild</button>
      <button onClick={toGallery}>Kolla in gellerian</button>
    </section>
  )
}

export default Landing;
