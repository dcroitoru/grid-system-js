import { calcNeighbours, extend, extendOne, keyToXY, pairToKey, XYtoKey } from './util';
import { channel, type Action } from './actions';
import { highlightGrid, housesGrid, persistentGrid, roadsGrid, treesGrid } from './grid';
import { canBuildWithToolOverCell, createHighlight, currentTool, tools } from './tools-system';

let tool;
currentTool.subscribe((v) => (tool = v));

let persistentGridValue = new Map();
let highlightGridValue = new Map();
persistentGrid.subscribe((v) => (persistentGridValue = v));
highlightGrid.subscribe((v) => (highlightGridValue = v));
const highlightAllowType = 'highlight-allow';
const highlightDenyType = 'highlight-deny';

const flip = (first, second) => first.x !== second.x;

const selectKey = ([key, value]) => key;
const selectRoads = ([key, value]) => value === tools.road;
const selectDeny = ([key, value]) => value === highlightDenyType;

const roadHasLessThan3Neighbors = (gridValue) => (highMap) => (cellId) => {
	const { x, y } = keyToXY(cellId);

	const roads = [...gridValue].filter(selectRoads).map(selectKey);
	const high = [...highMap].map(selectKey);

	const combinedSet = new Set([...roads, ...high]);

	console.log('==> combined set roads');

	console.log(combinedSet);

	// @ts-ignore
	return !calcNeighbours(combinedSet)(x, y).includes(3);
};

const roadHasNoDenyNeighbors = (gridValue) => (highMap) => (cellId) => {
	const { x, y } = keyToXY(cellId);

	const roads = [...highMap].filter(selectDeny).map(selectKey);

	const combinedSet = new Set([...roads]);

	console.log('==> combined set highlight');

	console.log(combinedSet);

	// @ts-ignore
	return !calcNeighbours(combinedSet)(x, y).includes(1);
};

const m = new Map();
m.set('0-0', 'road');
m.set('1-0', 'road');
m.set('0-1', 'road');
// m.set('2-1', 'house');

const h = new Map();
h.set('1-1', highlightDenyType);

// @ts-ignore
// const r = calcNeighbours(m)(1, 1).includes(3);
// console.log('==>calc neighbors');

const r = roadHasLessThan3Neighbors(m)(h)('2-1');
const t = roadHasNoDenyNeighbors(m)(h)('2-1');

console.log(r, t);

const canBuild = (toolId) => (persMap) => (highMap) => (cellId) => {
	const cell = persMap.get(cellId);

	const cellEmpty = !cell;

	if (cellEmpty && tool !== tools.road) return true;

	const canBuildOverCell = canBuildWithToolOverCell(toolId)(cell);

	const condition2 =
		tool === tools.road
			? roadHasLessThan3Neighbors(persMap)(highMap)(cellId) &&
			  roadHasNoDenyNeighbors(persMap)(highMap)(cellId)
			: true;

	return canBuildOverCell && condition2;
};

const withValue = (value) => (key) => [key, value];

const getHighlightData = (start, next, pos, tool) => {
	const shouldFlip = flip(keyToXY(start), keyToXY(next));
	const fn = createHighlight(tool);
	const highlight = fn(keyToXY(start), pos, shouldFlip).map(pairToKey);
	const highlightWithValue = highlight.map((key) => {
		const canActuallyBuild = canBuild(tool)(persistentGridValue)(highlightGridValue)(key);

		return canActuallyBuild ? [key, highlightAllowType] : [key, highlightDenyType];
	});

	console.log('====hilight data be here');
	console.log(highlightWithValue);

	return highlightWithValue;
};

const createGridSystem = () => {
	let current;
	let start;
	let next;

	const setCurrent = (pos) => {
		if (!pos) return;

		const posId = XYtoKey(pos);
		if (posId === current) return;
		if (start) {
			!next && (next = posId);

			highlightGrid.clear();
			const highlight = getHighlightData(start, next, pos, tool);

			console.log('multiple', highlight, persistentGridValue);

			// const highlightWithValue = highlight.map(withValue(highlightAllowType));
			highlightGrid.set(highlight);
		} else {
			current && highlightGrid.remove([[current]]);

			const allowOrDenyType = canBuild(tool)(persistentGridValue)(highlightGridValue)(posId)
				? highlightAllowType
				: highlightDenyType;

			// console.log('single', allowOrDenyType);

			highlightGrid.set([[posId, allowOrDenyType]]);
		}
		current = posId;
	};

	const startSelection = (pos) => {
		start = XYtoKey(pos);
	};

	const stopSelection = (pos) => {
		if (!start) return;

		console.log('stopping', persistentGridValue);

		// return;

		// const highlight = getHighlightData(start, next || start, pos, tool);
		const highlight = [...highlightGridValue];
		const highlightFiltered = highlight.filter(([key, value]) => value === highlightAllowType);

		const highlightWithToolApplied = highlightFiltered.map(([key]) => [key, tool]);

		persistentGrid.set(highlightWithToolApplied);
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
		persistentGrid.clear();
	};

	const reducers = {
		setCurrent,
		startSelection,
		stopSelection,
		cancel,
		clear
	};

	const handleAction = (action: Action = { type: 'init' }) => {
		const { type, payload } = action;

		const reducer =
			reducers[type] ||
			(() => {
				console.warn('no reducer for action', type);
			});
		reducer(payload);
	};

	channel.subscribe(handleAction);
};

export const gridSystem = createGridSystem();
