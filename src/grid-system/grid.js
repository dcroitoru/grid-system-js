import { writable } from 'svelte/store';

const addTo = (hash) => (val) => hash.add(val);

const deleteFrom = (hash) => (val) => hash.delete(val);

const createGrid = (name, w, h, gridSize) => {
	console.log('should create grid', name);

	const hash = new Set();
	const { subscribe, update } = writable(hash);
	const get = (id) => hash.has(id);

	const set = (ids, add = true) => {
		if (!ids) return;

		update((hashValue) => {
			add ? ids.map(addTo(hashValue)) : ids.map(deleteFrom(hashValue));
			return hashValue;
		});
	};

	const clear = (newValue = []) => update(() => new Set(newValue));

	const value = () => {
		console.log('should return ', name, hash);

		return [...hash];
	};

	return { subscribe, set, get, clear, value };
};

export const highlightGrid = createGrid('highlight');
export const roadsGrid = createGrid('roads');
export const treesGrid = createGrid('trees');
export const housesGrid = createGrid('houses');
