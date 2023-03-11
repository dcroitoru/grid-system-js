import { writable } from 'svelte/store';
import { createHalfPerimeter, createRect } from '../components/util';

export const tools = {
	road: 'road',
	trees: 'trees',
	house: 'house'
};
export const currentTool = writable(tools.trees);

const highlightMapFn = {
	trees: createRect,
	road: createHalfPerimeter,
	house: (p0, p1) => [[p1.x, p1.y]]
};

export const createHighlight = (tool) => highlightMapFn[tool] || createRect;
