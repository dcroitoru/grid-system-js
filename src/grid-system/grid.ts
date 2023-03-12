import { writable } from 'svelte/store';

export type Grid = Map<string, string>;

const addTo =
	(grid: Grid) =>
	([key, val]: [string, string]) =>
		grid.set(key, val);

const deleteFrom =
	(grid: Grid) =>
	([key]: [string]) =>
		grid.delete(key);

const createGrid = (name: string) => {
	console.log('should create grid', name);

	const grid: Grid = new Map<string, string>();
	const { subscribe, update } = writable(grid);
	const get = (key: string) => grid.has(key);

	const set = (kvs) => {
		if (!kvs) return;

		update((hashValue) => {
			kvs.map(addTo(hashValue));
			// console.log('adding', kvs, hashValue);
			return hashValue;
		});
	};

	const remove = (kvs) => {
		if (!kvs) return;

		update((hashValue) => {
			kvs.map(deleteFrom(hashValue));
			// console.log('deleting', kvs, hashValue);
			return hashValue;
		});
	};

	const clear = () => update(() => new Map());

	return { subscribe, clear, get, set, remove };
};

export const highlightGrid = createGrid('highlight');
export const persistentGrid = createGrid('persistent');
export const roadsGrid = createGrid('roads');
export const treesGrid = createGrid('trees');
export const housesGrid = createGrid('houses');
