export const sum = (a, b) => a + b;
export const max = (a, b) => (a > b ? a : b);
export const posEqual = (p1, p2) => p1.x == p2.x && p1.y == p2.y;

export const id = ({ x, y }) => `${x}-${y}`;

export const toXY = ([x, y]) => ({ x, y });

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

// export const throttle = (func, limit) => {
// 	let lastFunc;
// 	let lastRan;
// 	return function () {
// 		const context = this;
// 		const args = arguments;
// 		if (!lastRan) {
// 			func.apply(context, args);
// 			lastRan = Date.now();
// 		} else {
// 			clearTimeout(lastFunc);
// 			lastFunc = setTimeout(function () {
// 				if (Date.now() - lastRan >= limit) {
// 					func.apply(context, args);
// 					lastRan = Date.now();
// 				}
// 			}, limit - (Date.now() - lastRan));
// 		}
// 	};
// };
