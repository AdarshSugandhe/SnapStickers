import { useRef } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import useImage from "use-image";

function Sticker({ id, src, x, y, updatePosition, removeSticker }) {
  const [image] = useImage(src);

  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => updatePosition(id, e.target.x(), e.target.y())}
      onDblClick={() => removeSticker(id)}
    />
  );
}

const Canvas = (props) => {
  const { stickers, updatePosition, removeSticker } = props;
  const stageRef = useRef();

  return (
    <Stage width={600} height={400} ref={stageRef} className="canvas">
      <Layer>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            {...sticker}
            updatePosition={updatePosition}
            removeSticker={removeSticker}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
