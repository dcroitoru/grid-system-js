import { id, strToArr, toXY } from './util';
import { context, height, width, gridSize as gs, cellSize as cs } from './store';
import { tools } from './tools-system';

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
	'highlight-allow': '#b4b2f1',
	'highlight-deny': '#ff7d7d',
	[tools.road]: blue,
	[tools.house]: yellow,
	[tools.trees]: green,
	unknown: 'red'
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

export const drawText = (x, y, text, fontSize = 8) => {
	ctx.font = `lighter ${fontSize}px Trebuchet MS`;
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
	return colors[cell.data] || colors.unknown;
};

export const drawCell = (cell) => {
	const x = cell.x * cellSize;
	const y = cell.y * cellSize;
	const b = 1;

	const color = getCellColor(cell);

	drawRect(x, y, cellSize, cellSize);
	drawRect(x + b, y + b, cellSize - 2 * b, cellSize - 2 * b, color);
	drawText(x + cellSize / 2 - 5, y + 15, `${cell.x},${cell.y}`);

	color === colors['highlight-deny'] && drawText(x+21, y + 50, '❌', 20);
};

/**
 * Transforms
 * [key, value] => {x, y, data}
 */
const createCellData = ([key, value]) => {
	// @ts-ignore
	const { x, y } = toXY(strToArr(key));
	const data = value;
	const color = getCellColor(value);
	return { x, y, data, color };
};

export const draw = (grid, data) => {
	[...grid].map(createCellData).map(drawCell);
};
