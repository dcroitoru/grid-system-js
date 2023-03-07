<script>
	import { createEventDispatcher } from 'svelte';
	import CellRenderer from './cell-renderers/CellRenderer.svelte';
	import Road from './cell-renderers/Road.svelte';

	export let cell;



	let { x, y, data } = cell;
	let renderer = CellRenderer;
	// $: {
	// 	x = cell.x;
	// 	y = cell.y;
	// }

	// ({ x, y, data } = cell);

	$: {
		data = cell.data;
		renderer = cell.data ? Road : CellRenderer;
	}

	const dispatch = createEventDispatcher();

	const mouseOver = (cell) => {
		// console.log('should dispatch over cell', cell);
		dispatch('over-cell', cell);
	};

	const mouseOut = (cell) => {
		// console.log('should dispatch over cell', cell);
		dispatch('out-cell', cell);
	};

	const mouseDown = (cell) => {
		// console.log('should dispatch start cell', cell);
		dispatch('start-cell', cell);
	};

	const mouseUp = (cell) => {
		// console.log('should dispatch end cell', cell);

		dispatch('end-cell', cell);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
	class="cell"
	on:mouseover={() => mouseOver(cell)}
	on:mouseout={() => mouseOut(cell)}
	on:mousedown={() => mouseDown(cell)}
	on:mouseup={() => mouseUp(cell)}
>
	<span class="index">{x},{y}</span>

	<svelte:component this={renderer} {data} />

	<!-- {#if cell.s.length}
		<div>
			<span class="tl">{cell.s[0]}</span>
			<span class="tr">{cell.s[1]}</span>
			<span class="bl">{cell.s[2]}</span>
			<span class="br">{cell.s[3]}</span>
		</div>
	{/if} -->
</div>

<style>
	:root {
		--cell-size: 70px;
	}

	.cell {
		background-color: #c4f8f8;
		display: grid;
		grid-template-rows: 1fr;
		font-size: x-small;
		position: relative;
		user-select: none;
	}

	.cell * {
		pointer-events: none;
	}

	.index {
		position: absolute;
		display: grid;
		place-items: center;
	}
</style>
