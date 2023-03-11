import { writable } from 'svelte/store';
import { createRect } from '../components/grid';
import { id, posEqual, strToArr, strToXY, toID, toXY } from '../components/util';
import { highlightGrid, roadsGrid } from './grid';

export const actions = {
	startSelection: 'startSelection',
	stopSelection: 'stopSelection',
	cancel: 'cancel',
	setCurrent: 'setCurrent',
	clear: 'clear'
};

const createGridSystem = (w, h, gridSize) => {
	const { subscribe, set, update } = writable();
	let current;
	let start = '';
	let end;
	let tempHighlight = [];

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

		/**
		 * based on current, and selected tool, should update grid;
		 * if start selection is false, should clear selection
		 */

		if (start) {
			highlightGrid.clear();
			const area = createRect(strToXY(start), pos);
			tempHighlight = area.map(toID);
			highlightGrid.set(tempHighlight, true);
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
		end = id(pos);

		if (!start) return;

		console.log('should create permanent', tempHighlight);

		roadsGrid.set(tempHighlight);

		highlightGrid.clear();

		start = null;
		end = null;
		tempHighlight = [];
	};

	const cancel = () => {
		current = null;
		start = null;
		highlightGrid.clear();
	};

	const clear = () => {
		current = null;
		start = null;
		tempHighlight = null;
		highlightGrid.clear();
		roadsGrid.clear();
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
