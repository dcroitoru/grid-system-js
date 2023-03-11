<script>
	import Canvas from './Canvas.svelte';
	import { highlightGrid, roadsGrid } from './grid';

	setTimeout(() => {
		// drawGrid();
		const initialState = ['0-0', '1-0'];
		roadsGrid.set(initialState);
	}, 1000);
</script>

<h1>Grid System v2</h1>
<!-- <div>
	<button on:click={inc}>+</button>
	<button on:click={dec}>-</button>
	<button on:click={() => count.dispatch('inc', $count + 10)}>reset</button>
</div> -->

<Canvas />
