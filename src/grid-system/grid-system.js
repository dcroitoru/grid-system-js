import { writable } from 'svelte/store';
import {
	createHalfPerimeter,
	createPerimeter,
	createRect,
	id,
	posEqual,
	strToArr,
	strToXY,
	toID,
	toXY
} from '../components/util';
import { highlightGrid, housesGrid, roadsGrid, treesGrid } from './grid';
import { createHighlight, currentTool, tools } from './tools-system';

export const actions = {
	startSelection: 'startSelection',
	stopSelection: 'stopSelection',
	cancel: 'cancel',
	setCurrent: 'setCurrent',
	clear: 'clear'
};

let tool;
currentTool.subscribe((v) => (tool = v));

const flip = (first, second) => first.x !== second.x;

const getHighlightData = (start, next, pos, tool) => {
	const shouldFlip = flip(strToXY(start), strToXY(next));
	const fn = createHighlight(tool);
	const highlight = fn(strToXY(start), pos, shouldFlip).map(toID);
	return highlight;
};

const createGridSystem = (w, h, gridSize) => {
	const { subscribe, set, update } = writable();
	let current;
	let start;
	let next;

	const handleEvent = (type, payload) => {
		const reducer =
			reducers[type] ||
			(() => {
				console.log('no reducer for action', type);
			});
		reducer(payload);
	};

	const setCurrent = (pos) => {
		if (!pos) return;

		const posId = id(pos);
		if (posId === current) return;
		if (start) {
			!next && (next = posId);

			console.log(start, next);

			highlightGrid.clear();
			const highlight = getHighlightData(start, next, pos, tool);
			highlightGrid.set(highlight, true);
		} else {
			current && highlightGrid.set([current], false);
			highlightGrid.set([posId], true);
		}
		current = posId;
	};

	const startSelection = (pos) => {
		start = id(pos);
	};

	const stopSelection = (pos) => {
		if (!start) return;

		const highlight = getHighlightData(start, next || start, pos, tool);

		console.log(highlight);

		tool == tools.road && roadsGrid.set(highlight);
		tool == tools.trees && treesGrid.set(highlight);
		tool == tools.house && housesGrid.set(highlight);
		highlightGrid.clear();

		start = null;
		next = null;
	};

	const cancel = () => {
		current = null;
		start = null;
		highlightGrid.clear();
	};

	const clear = () => {
		current = null;
		start = null;

		highlightGrid.clear();
		roadsGrid.clear();
		housesGrid.clear();
		treesGrid.clear();
	};

	const reducers = {
		setCurrent,
		startSelection,
		stopSelection,
		cancel,
		clear
	};

	const dispatch = (type, payload) => {
		// console.log('should dispatch', type, payload);

		handleEvent(type, payload);
	};

	return { subscribe, dispatch };
};

export const gridSystem = createGridSystem();
export const dispatch = gridSystem.dispatch;
