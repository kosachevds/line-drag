import React, { useRef, useEffect } from 'react';
import classes from "./App.module.css"

type Point2D = {
  x: number;
  y: number;
}

type Line = {
  begin: Point2D;
  end: Point2D;
}

type LineStyle = {
  color?: string;
  width?: number;
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    // dynamically assign the width and height to canvas
    const canvasElement = canvasRef.current;
    canvasElement.width = canvasElement.clientWidth;
    canvasElement.height = canvasElement.clientHeight;
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (!ctx) {
      return;
    }
    drawLine(ctx, { begin: { x: 20, y: 20 }, end: { x: 20, y: 100 } });
    drawLine(ctx, { begin: { x: 50, y: 50 }, end: { x: 200, y: 100 } }, { color: 'red' });
    drawLine(ctx, { begin: { x: 300, y: 250 }, end: { x: 260, y: 70 } }, { color: 'green', width: 5 });
    drawLine(ctx, { begin: { x: 70, y: 240 }, end: { x: 160, y: 120 } }, { color: 'blue' });

  }, []);

  const drawLine = (ctx: CanvasRenderingContext2D, line: Line, style: LineStyle = {}) => {
    const { color = "black", width = 1} = style;
    const { begin, end } = line;

    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  return (
    <div className={classes.App}>
      <h3>Draw a rectangle on Canvas - <a href="http://www.cluemediator.com" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      <canvas className={classes.canvas} ref={canvasRef}></canvas>
    </div>
  );
}

export default App;