<script>
	import { onMount } from 'svelte';

	import { draw, drawGrid, worldToGrid } from './canvas.js';
	import { actions, gridSystem } from './grid-system.js';
	import { highlightGrid, housesGrid, roadsGrid, treesGrid } from './grid.js';
	import { width, height, canvas as canvasStore, context as contextStore } from './store.js';

	let canvas;
	let context;

	const dispatch = gridSystem.dispatch;

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
			draw($housesGrid, { house: true });
			draw($treesGrid, { tree: true });
			draw($roadsGrid, { road: true });
			draw($highlightGrid, { highlight: true });
		}
	}

	const onMouseMove = (event) => {
		const pos = worldToGrid(event);
		pos && dispatch(actions.setCurrent, pos);
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
