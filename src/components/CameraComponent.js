import { useRef, useEffect, useState} from "react"
import { useNavigate } from 'react-router-dom';
import './CameraComponent.css'


function Camera(){
  const canvas = useRef(null);
  const videoElem = useRef(null);
  const navigate = useNavigate();
  const getLocalStorage = localStorage.getItem('camera');
  const [ localImages, setLocalImages ] = useState(JSON.parse(getLocalStorage) || []);
  const [isActive, setIsActive] = useState(false);
  let stream;
  let notificationPermission = '';




  function takePicture(){
    const ctx = canvas.current.getContext('2d');
    ctx.drawImage(videoElem.current, 0, 0, canvas.current.width, canvas.current.height);
    const imageData = canvas.current.toDataURL('image/png');

    console.log(localImages);

    let images = localImages;
    images.push({
      image: imageData
    });
    setLocalImages(images);

    localStorage.setItem('camera', JSON.stringify(localImages));
    createNotification('Du tog en bild!');
  };

  async function startCamera(){
    const options = {
      video: {
        facingMode: 'user'
      },
      audio: false

    }
    if('mediaDevices' in navigator){
      stream = await navigator.mediaDevices.getUserMedia(options)
      videoElem.current.srcObject = stream;

    }
  }

  function createNotification(text) {
      console.log(notificationPermission);
      if (notificationPermission === 'granted') {
          const icon = 'favicon.ico';

          const notification = new Notification('Wedding Photographer', { body: text, icon: icon });

          notification.addEventListener('click', () => {
            navigate('/gallery');
          });

      }
  }

  function requestNotificationPermission() {
      Notification.requestPermission().then((permission) => {
          notificationPermission = permission;
      });
  }


  useEffect(() => {
    startCamera();
    requestNotificationPermission();
  }, []);

  return (
    <section className="cameraComponent">
      <div className="fill"></div>
      <section className="videoAndCanvas">
        <video ref={videoElem} src="" className="camera" autoPlay></video>
        <canvas ref={canvas} className="picture"></canvas>
      </section>
      <div className="fill"></div>
      <section className="takePicture">
        <button className="pictureBtn" onClick={takePicture}>FÖREVIGA ETT ÖGONBLICKA</button>
      </section>
    </section>
  )
}

export default Camera;
