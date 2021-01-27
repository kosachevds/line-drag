import React, { useCallback, useEffect, useRef, useState } from 'react';

const LINE_WIDTH = 5;
const LINE_COLOR = "red";

interface CanvasProps {
    width: number;
    height: number;
    widthCoefficient: number;
    heightCoefficient: number;
    widthUnit: string;
    heightUnit: string;
}

type Coordinate = {
    x: number;
    y: number;
};

const getLineMiddle = (begin: Coordinate, end: Coordinate): Coordinate => {
    return {
        x: (begin.x + end.x) / 2,
        y: (begin.y + end.y) / 2,
    };
};

const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setPainting] = useState(false);
    const [lineBegin, setLineBegin] = useState<Coordinate | undefined>(undefined);

    const startPaint = useCallback((event: MouseEvent) => {
        const coordinates = getCoordinates(event);
        if (coordinates) {
            setPainting(true);
            setLineBegin(coordinates);
        }
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const paint = useCallback((event: MouseEvent) => {
        if (!isPainting) {
            return;
        }
        const currentPosition = getCoordinates(event);
        if (!lineBegin || !currentPosition) {
            return;
        }
        resetCanvas();
        drawLine(lineBegin, currentPosition);
        const text =
            `height: ${Math.abs(lineBegin.y - currentPosition.y)} px` +
            `width: ${Math.abs(lineBegin.x - currentPosition.x)} px`
        const middle = getLineMiddle(lineBegin, currentPosition);
        writeText(middle, text);
    }, [isPainting, lineBegin]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
        };
    }, [paint]);

    const exitPaint = useCallback(() => {
        setPainting(false);
        setLineBegin(undefined);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }

        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };

    const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
        const context = canvasRef.current?.getContext('2d');
        if (!context) {
            return;
        }
        context.strokeStyle = LINE_COLOR;
        context.lineJoin = 'round';
        context.lineWidth = LINE_WIDTH;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
    };

    const resetCanvas = () => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) {
            return;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const writeText = (point: Coordinate, text: string) => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) {
            return;
        }

        const fontSize = 20;
        const fontFamily = 'Arial';
        const color = LINE_COLOR;
        const textAlign = 'left';
        const textBaseline = 'top';

        ctx.beginPath();
        ctx.font = fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, point.x, point.y);
        ctx.stroke();
      }

    return <canvas ref={canvasRef} height={props.height} width={props.width} />;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight,
    widthCoefficient: 1,
    heightCoefficient: 1,
    widthUnit: "px",
    heightUnit: "px",
};

export default Canvas;
