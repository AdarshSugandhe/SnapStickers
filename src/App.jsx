import { useState } from "react";
import { v4 as uuid } from "uuid";
import Canvas from "./components/Canvas";
import StickerButton from "./components/StickerButton";
import sticker1 from "../public/stickers/sticker1.png";
import sticker2 from "../public/stickers/sticker2.png";
import sticker3 from "../public/stickers/sticker3.png";

const snapToGrid = (value, gridSize = 40) =>
  Math.round(value / gridSize) * gridSize;

export default function App() {
  const [stickers, setStickers] = useState([]);

  const addSticker = (src) => {
    const x = snapToGrid(50 + Math.random() * 200);
    const y = snapToGrid(50 + Math.random() * 200);
    setStickers([...stickers, { id: uuid(), src, x, y }]);
  };

  const updatePosition = (id, x, y) => {
    setStickers((prev) =>
      prev.map((sticker) =>
        sticker.id === id
          ? { ...sticker, x: snapToGrid(x), y: snapToGrid(y) }
          : sticker
      )
    );
  };

  const removeSticker = (id) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id));
  };

  const onClickDownloadBtn = () => {
    const stage = document.querySelector("canvas");
    const url = stage.toDataURL();
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = url;
    link.click();
  };

  return (
    <div className="app">
      <div className="app-card">
        <div className="controls">
          <StickerButton
            image={sticker1}
            onClick={() => addSticker(sticker1)}
          />
          <StickerButton
            image={sticker2}
            onClick={() => addSticker(sticker2)}
          />
          <StickerButton
            image={sticker3}
            onClick={() => addSticker(sticker3)}
          />
          <button
            className="download-button"
            onClick={() => onClickDownloadBtn()}
          >
            Download
          </button>
        </div>
        <Canvas
          stickers={stickers}
          updatePosition={updatePosition}
          removeSticker={removeSticker}
        />
      </div>
    </div>
  );
}
