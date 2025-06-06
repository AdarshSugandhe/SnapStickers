import '../../src/App.css'

const StickerButton = (props) => {
  const { image, onClick } = props
  return (
    <button className="sticker-button" onClick={onClick}>
      <img src={image} alt="sticker" />
    </button>
  );
}

export default StickerButton;