<script lang="ts">
	import { onMount } from 'svelte';
	import { actions, dispatch } from './actions.js';

	import { draw, drawGrid, worldToGrid } from './canvas.js';

	import { highlightGrid, housesGrid, persistentGrid, roadsGrid, treesGrid } from './grid.js';
	import { width, height, canvas as canvasStore, context as contextStore } from './store.js';
	import { posEqual } from './util.js';

	let canvas;
	let context;

	onMount(() => {
		// prepare canvas stores
		context = canvas.getContext('2d');
		canvasStore.set(canvas);
		contextStore.set(context);
	});

	/**
	 * Render
	 */
	$: {
		if ($highlightGrid && context) {
			drawGrid();
			// draw($housesGrid, { house: true });
			draw($persistentGrid);
			// draw($roadsGrid, { road: true });
			draw($highlightGrid);
		}
	}

	let lastPos = {};

	const onMouseMove = (event) => {
		const pos = worldToGrid(event);

		if (!pos) return;
		!posEqual(pos, lastPos) && dispatch(actions.setCurrent, pos);
		lastPos = pos;
	};

	const onMouseDown = (event) => {
		const pos = worldToGrid(event);
		pos && dispatch(actions.startSelection, pos);
	};

	const onMouseUp = (event) => {
		const pos = worldToGrid(event);
		pos && dispatch(actions.stopSelection, pos);
	};

	const onMouseLeave = (event) => {
		dispatch(actions.cancel);
	};

	const onKeyPress = (event) => {
		if (event.key === 'Escape') {
			dispatch(actions.cancel);
		}
	};
</script>

<canvas
	bind:this={canvas}
	width={$width}
	height={$height}
	style="width: {$width}px; height: {$height}px;"
	on:mousemove={onMouseMove}
	on:mousedown={onMouseDown}
	on:mouseup={onMouseUp}
	on:mouseleave={onMouseLeave}
/>
<svelte:window on:keydown={onKeyPress} />
