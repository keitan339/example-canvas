import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Text, Image, Line } from "react-konva";
import Konva from "konva";
import imageData from "./car.png";
import { Box, Button, Checkbox, SvgIcon } from "@mui/material";
import BrushSvg from "./brush.svg";
import EraserSvg from "./eraser.svg";

const image = new window.Image();
image.src = imageData;

export const ReactKonvaPage = () => {
  const [lines, setLines] = useState<number[][]>([]);
  const isDrawing = useRef(false);
  const stageRef = useRef<Konva.Stage>(null);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (stageRef.current == null) return;

    const position = stageRef.current.getPointerPosition();
    if (position == null) return;

    setLines([...lines, [position.x, position.y]]);

    isDrawing.current = true;
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (isDrawing.current === false) return;

    if (stageRef.current == null) return;

    const position = stageRef.current.getPointerPosition();
    if (position == null) return;

    const lastLine = lines[lines.length - 1];
    const addLines = lastLine.concat([position.x, position.y]);
    lines.splice(lines.length - 1, 1, addLines);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const drawLayerRef = useRef<Konva.Layer>(null);
  const handleDownloadButtonClick = () => {
    if (drawLayerRef.current == null) return;

    const dataURL = drawLayerRef.current.toDataURL({ mimeType: "image/png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "image.png";
    link.click();

    URL.revokeObjectURL(link.href);
    link.remove();
  };

  const canvasBoxRef = useRef<HTMLDivElement>();

  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (canvasBoxRef.current == null) return;
    setCanvasSize({ width: canvasBoxRef.current.offsetWidth, height: canvasBoxRef.current.offsetHeight });
  }, []);

  return (
    <>
      <Box>
        <img src={BrushSvg} />
        <BrushIcon />
        <Checkbox icon={<BrushIcon />} checkedIcon={<BrushIcon />} />
      </Box>
      <Box sx={{ height: "600px", width: "100%" }} ref={canvasBoxRef}>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
        >
          <Layer>
            <Image image={image} />
          </Layer>
          <Layer ref={drawLayerRef}>
            {lines.map((line, index) => {
              return <Line key={index} points={line} stroke="red" strokeWidth={12} tension={0.5} lineCap="round" globalCompositeOperation={"source-over"} />;
            })}
          </Layer>
        </Stage>
      </Box>

      <Box>
        <Button variant="contained" onClick={handleDownloadButtonClick}>
          ダウンロード
        </Button>
      </Box>
    </>
  );
};

const BrushIcon = () => {
  return (
    <SvgIcon>
      <img src={BrushSvg} />
    </SvgIcon>
  );
};
