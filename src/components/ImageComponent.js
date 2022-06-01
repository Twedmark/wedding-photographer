import './ImageComponent.css'

function ImageComponent(props) {
  const { galleryItem, deletePicture, galleryIndex } = props;

function handeleOnClick(){
  deletePicture(galleryIndex);
}

  return (
    <section className="imageComponent">
      <button className="deleteBtn" onClick={ handeleOnClick }>X</button>
      <img src={galleryItem.image} alt={ galleryIndex }/>
    </section>
  )
}

export default ImageComponent;
