import { id, strToArr, toXY } from '../components/util';
import { context, height, width, gridSize as gs, cellSize as cs } from './store';

let ctx, w, h, gridSize, cellSize;

context.subscribe((c) => (ctx = c));
width.subscribe((_w) => (w = _w));
height.subscribe((_h) => (h = _h));
gs.subscribe((v) => (gridSize = v));
cs.subscribe((v) => (cellSize = v));

const green = '#06d6a0';
const blue = '#118ab2';
const darkBlue = '#073b4c';
const lightBlue = '#cbf3f0';
const yellow = '#ffd166';

const colors = {
	default: '#c4f8f8',
	background: '#fff',
	highlight: '#b4b2f1',
	road: blue,
	house: yellow,
	tree: green
};

// const colors = {
// 	default: '#c4f8f8',
// 	background: '#fff',
// 	road: '#18ab8d',
// 	allow: '#b4b2f1',
// 	forbid: '#ec6d6d'
// };

export const clear = () => {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const drawRect = (x, y, w, h, color = colors.background) => {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, w, h);
};

export const drawText = (x, y, text) => {
	ctx.font = 'lighter 8px Trebuchet MS';
	ctx.strokeText(text, x, y);
};

export const worldToGrid = ({ offsetX, offsetY }) => {
	if (offsetX >= w || offsetX < 0 || offsetY >= h || offsetY < 0) return null;
	return { x: Math.floor((offsetX / w) * gridSize), y: Math.floor((offsetY / h) * gridSize) };
};

export const drawGrid = () => {
	for (let y = 0; y < gridSize; y++) {
		for (let x = 0; x < gridSize; x++) {
			drawCell({ x, y });
		}
	}
};

const getCellColor = (cell) => {
	if (!cell.data) return colors.default;
	if (cell.data.highlight) return colors.highlight;
	if (cell.data.road) return colors.road;
	if (cell.data.tree) return colors.tree;
	if (cell.data.house) return colors.house;
	return colors.default;
};

export const drawCell = (cell) => {
	const x = cell.x * cellSize;
	const y = cell.y * cellSize;
	const b = 1;

	const color = getCellColor(cell);

	drawRect(x, y, cellSize, cellSize);
	drawRect(x + b, y + b, cellSize - 2 * b, cellSize - 2 * b, color);
	drawText(x + cellSize / 2 - 5, y + 15, `${cell.x},${cell.y}`);
};

export const draw = (grid, data) => {
	// console.log('should draw grid', [...grid].map(toXY2))

	// Object.values(grid).map(drawCell);

	// console.log('should draw grid', grid, data);

	[...grid]
		.map(strToArr)
		.map(toXY)
		.map((cell) => drawCell({ ...cell, data }));
};
