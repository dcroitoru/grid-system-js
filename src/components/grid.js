import { extend, id, sum } from '../grid-system/util';

export const createGrid = (w, h) => {
	const grid = [];
	for (let y = 0; y < h; y++) {
		grid[y] = new Array(w);

		for (let x = 0; x < h; x++) {
			grid[y][x] = {
				id: id({ x, y }),
				x,
				y,
				data: null
			};
		}
	}

	return grid;
};

export const clearGrid = (grid) => {
	return grid.map((row) => row.map((cell) => ({ ...cell, data: null })));
};

export const createInterval = (x0, x1) => {
	let arr = [];

	// Note: keep in original form untill create segment
	// to demonstrate problem solving
	// const sign = Math.sign(x1 - x0)

	// Signum
	// 1: ---> 0...5
	// -1: <---- 5...0
	const sign = Math.sign(x1 - x0) || 1;
	const len = Math.abs(x1 - x0 + sign);
	for (let i = 0; i < len; i++) {
		arr.push(x0 + i * sign);
	}

	// Note: naive implementation
	// if (x0 < x1) {
	// 	for (let i = x0; i <= x1; i++) {
	// 		arr.push(i);
	// 	}
	// } else {
	// 	for (let i = x0; i >= x1; i--) {
	// 		arr.push(i);
	// 	}
	// }

	return arr;
};

export const createSegmentOnX = (interval, y) => interval.map((x) => [x, y]);
export const createSegmentOnY = (interval, x) => interval.map((y) => [x, y]);

// export const createSegment = (x0, y0, x1, y1) => {
// 	const xsize = x1 - x0;
// 	const xsign = Math.sign(xsize);
// 	const xlen = Math.abs(xsize);

// 	console.log('should create segment', x0, x1, xsize, xsign, xlen);

// 	return new Array(xlen).fill([x, y]).map(([x, y], i) => (flip ? [x, y + i] : [x + i, y]));;
// };

// export const createSegment = (x, y, len, flip = false) =>
// 	new Array(len).fill([x, y]).map(([x, y], i) => (flip ? [x, y + i] : [x + i, y]));

export const createCellData = ({ x, y }) => [x, y];
export const createRoadData = (cells) => cells.map(createCellData);

export const value =
	(grid) =>
	([x, y]) => {
		if (grid[y] && grid[y][x]) {
			if (grid[y][x].forbid) return 3;
			if (grid[y][x].allow) return 2;
			if (grid[y][x].road) return 1;
		}
		return 0;
	};

export const createRect = (p0, p1) => {
	const xInterval = createInterval(p0.x, p1.x);
	const yInterval = createInterval(p0.y, p1.y);

	const ySegments = yInterval.map((y) => createSegmentOnX(xInterval, y));
	const arr = ySegments.flat(1);
	// reduce((a, b) => a.concat(b), []);

	// let arr = [];
	// Note: is this really the best way?
	// for (let i = 0; i < yInterval.length; i++) {
	// 	arr.push(...ySegments[i]);
	// }

	// Naive implementation, strikes again
	// if (p0.y < p1.y) {
	// 	for (let j = p0.y; j < p1.y; j++) {
	// 		arr.push[createSegmentOnX(xInterval, j)];
	// 	}
	// }

	return arr;
};

// How cool is that?
export const createRectOneLine = (p0, p1) =>
	createInterval(p0.y, p1.y)
		.map((y) => createSegmentOnX(createInterval(p0.x, p1.x), y))
		.flat(1);
