// @ts-ignore
let ctx;
let size;
let w, h;
let cellSize;
let gridSize;
const colors = {
	default: '#c4f8f8',
	background: '#fff',
	road: '#18ab8d',
	allow: '#b4b2f1',
	forbid: '#ec6d6d'
};

const getCellColor = (cell) => {
	if (!cell.data) return colors.default;
	if (cell.data.allow) return colors.allow;
	if (cell.data.road) return colors.road;
	return colors.default;
};

export const setContext = (_ctx, _size, _gridSize, _cellSize) => {
	ctx = _ctx;
	gridSize = _gridSize;
	cellSize = _cellSize;
	w = gridSize * cellSize;
	h = gridSize * cellSize;
};

export const drawGrid = (grid) => {
	grid.map((row) => row.map(drawCell));
};

export const drawCell = (cell) => {
	if (cell.x == 8 && cell.y == 8 && cell.data) {
		console.log('drawing cell', cell.data?.allow);
	}

	const x = cell.x * cellSize;
	const y = cell.y * cellSize;
	const b = 1;

	const color = getCellColor(cell);
	drawRect(x, y, cellSize, cellSize);
	drawRect(x + b, y + b, cellSize - 2 * b, cellSize - 2 * b, color);
	drawText(x + cellSize / 2 - 5, y + 15, `${cell.x},${cell.y}`);
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
