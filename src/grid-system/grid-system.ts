import { id, strToXY, toID } from './util';
import { channel, type Action } from './actions';
import { highlightGrid, housesGrid, persistentGrid, roadsGrid, treesGrid } from './grid';
import { createHighlight, currentTool, tools } from './tools-system';

let tool;
currentTool.subscribe((v) => (tool = v));

const highlightType = 'highlight';

const flip = (first, second) => first.x !== second.x;

const withValue = (value) => (key) => [key, value];

const getHighlightData = (start, next, pos, tool) => {
	const shouldFlip = flip(strToXY(start), strToXY(next));
	const fn = createHighlight(tool);
	const highlight = fn(strToXY(start), pos, shouldFlip).map(toID);
	return highlight.map(withValue(highlightType));
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
			const highlight = getHighlightData(start, next, pos, tool);
			highlightGrid.set(highlight);
		} else {
			current && highlightGrid.remove([[current]]);
			highlightGrid.set([[posId, highlightType]]);
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

		persistentGrid.set(highlight.map(([key]) => [key, tool]));
		// tool == tools.road && roadsGrid.set(highlight);
		// tool == tools.house && housesGrid.set(highlight);
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
