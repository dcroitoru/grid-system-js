import { derived, readable, writable } from 'svelte/store';


const w = 700;
const h = 700
const gs = 10;
const cs = 70

export const width = writable(w);
export const height = writable(h);
export const gridSize = writable(gs);
export const cellSize = writable(cs);
/**@type CanvasRenderingContext2D|any */
export const context = writable();
export const canvas = writable();


// export const grid = derived(context, (c, set) => {
// 	console.log('deriving from context', c);

// 	if (c) {
// 		console.log('context set, creating grid');

// 		set(createGrid());
// 	}
// });
