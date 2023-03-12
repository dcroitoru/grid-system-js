import { id, strToXY, toID } from './util';
import { channel, type Action } from './actions';
import { highlightGrid, housesGrid, persistentGrid, roadsGrid, treesGrid } from './grid';
import { canBuildWithToolOverCell, createHighlight, currentTool, tools } from './tools-system';

let tool;
currentTool.subscribe((v) => (tool = v));

let persistentGridValue = new Map();
persistentGrid.subscribe((v) => (persistentGridValue = v));
const highlightAllowType = 'highlight-allow';
const highlightDenyType = 'highlight-deny';

const flip = (first, second) => first.x !== second.x;

const canBuild = (toolId) => (map) => (cellId) => {
	const cell = map.get(cellId);

	if (!cell) return true;

	return canBuildWithToolOverCell(toolId)(cell);
};

// const m = new Map();
// m.set('0-0', 'trees');
// m.set('0-1', 'road');
// m.set('0-2', 'house');

// console.log(canBuild(tools.road)(m)('0-2'));

const withValue = (value) => (key) => [key, value];

const getHighlightData = (start, next, pos, tool, persGridValue) => {
	const shouldFlip = flip(strToXY(start), strToXY(next));
	const fn = createHighlight(tool);
	const highlight = fn(strToXY(start), pos, shouldFlip).map(toID);
	const highlightWithValue = highlight.map((key) => {
		return canBuild(tool)(persGridValue)(key)
			? [key, highlightAllowType]
			: [key, highlightDenyType];
	});
	return highlightWithValue;
};

const createGridSystem = () => {
	let current;
	let start;
	let next;

	const setCurrent = (pos) => {
		if (!pos) return;

		const posId = id(pos);
		if (posId === current) return;
		if (start) {
			!next && (next = posId);

			highlightGrid.clear();
			const highlight = getHighlightData(start, next, pos, tool, persistentGridValue);

			// console.log('multiple', highlight, persistentGridValue);

			// const highlightWithValue = highlight.map(withValue(highlightAllowType));
			highlightGrid.set(highlight);
		} else {
			current && highlightGrid.remove([[current]]);

			const allowOrDenyType = canBuild(tool)(persistentGridValue)(posId)
				? highlightAllowType
				: highlightDenyType;

			// console.log('single', allowOrDenyType);

			highlightGrid.set([[posId, allowOrDenyType]]);
		}
		current = posId;
	};

	const startSelection = (pos) => {
		start = id(pos);
	};

	const stopSelection = (pos) => {
		if (!start) return;

		console.log('stopping', persistentGridValue);

		// return;

		const highlight = getHighlightData(start, next || start, pos, tool, persistentGridValue);
		const highlightFiltered = highlight.filter(([key, value]) => value === highlightAllowType);

		debugger;

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
