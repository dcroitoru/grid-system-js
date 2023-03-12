import { writable } from 'svelte/store';
import { createHalfPerimeter, createRect } from './util';

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

const rulesDeny = {
	[tools.trees]: [tools.road, tools.house],
	[tools.road]: [tools.house],
	[tools.house]: []
};

export const canBuildWithToolOverCell = (buildWith) => (buildOver) => {
	console.log('can build with', buildWith, 'over', buildOver);
	return !rulesDeny[buildWith]?.includes(buildOver);
};

// console.log('===apply rule');
// console.log(canBuild(tools.road)(tools.road));
