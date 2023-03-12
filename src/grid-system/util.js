export const sum = (a, b) => a + b;
export const max = (a, b) => (a > b ? a : b);
export const posEqual = (p1 = {}, p2 = {}) => p1.x == p2.x && p1.y == p2.y;

export const id = ({ x, y }) => `${x}-${y}`;

export const toXY = ([x, y]) => ({ x, y });
export const toID = ([x, y]) => `${x}-${y}`;

// @ts-ignore
export const strToArr = (str = '') => {
	const [x, y] = str.split('-').map(Number);
	return [x, y];
};

export const strToXY = (str = '') => {
	const [x, y] = str.split('-').map(Number);
	return { x, y };
};

export const extend = (x, y, a, b) => [
	[x + a, y],
	[x + a, y + b],
	[x, y + b]
];

export function throttle(cb, delay = 100) {
	let shouldWait = false;

	return (...args) => {
		if (shouldWait) return;

		cb(...args);
		shouldWait = true;

		setTimeout(() => {
			shouldWait = false;
		}, delay);
	};
}

export const createInterval = (x0, x1) => {
	let arr = [];

	const sign = Math.sign(x1 - x0) || 1;
	const len = Math.abs(x1 - x0 + sign);
	for (let i = 0; i < len; i++) {
		arr.push(x0 + i * sign);
	}

	return arr;
};

export const createSegmentOnX = (interval, y) => interval.map((x) => [x, y]);
export const createSegmentOnY = (interval, x) => interval.map((y) => [x, y]);

export const createRect = (p0, p1) => {
	const xInterval = createInterval(p0.x, p1.x);
	const yInterval = createInterval(p0.y, p1.y);

	const ySegments = yInterval.map((y) => createSegmentOnX(xInterval, y));
	const arr = ySegments.flat(1);
	return arr;
};

export const createPerimeter = (p0, p1) => {
	const xInterval = createInterval(p0.x, p1.x);
	const yInterval = createInterval(p0.y, p1.y);

	const arr = [
		createSegmentOnX(xInterval, p0.y),
		createSegmentOnY(yInterval, p1.x),
		createSegmentOnX(xInterval, p1.y),
		createSegmentOnY(yInterval, p0.x)
	];

	return arr.flat(1);
};

export const createHalfPerimeter = (p0, p1, flip = false) => {
	const xInterval = createInterval(p0.x, p1.x);
	const yInterval = createInterval(p0.y, p1.y);

	const arr = flip
		? [createSegmentOnX(xInterval, p0.y), createSegmentOnY(yInterval, p1.x)]
		: [createSegmentOnY(yInterval, p0.x), createSegmentOnX(xInterval, p1.y)];
	return arr.flat(1);
};
