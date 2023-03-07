export const sum = (a, b) => a + b;
export const max = (a, b) => (a > b ? a : b);

export const id = ({ x, y }) => `r${x}-${y}`;


export const extend = (x, y, a, b) => [
	[x + a, y],
	[x + a, y + b],
	[x, y + b]
];
