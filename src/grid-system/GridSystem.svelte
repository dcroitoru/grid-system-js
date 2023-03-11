<script>
	import Canvas from './Canvas.svelte';
	import { highlightGrid, housesGrid, roadsGrid, treesGrid } from './grid';
	import { actions, dispatch } from './grid-system';
	import Tools from './Tools.svelte';

	setTimeout(() => {
		// drawGrid();
		// const initialState = ['0-0', '1-0'];
		// roadsGrid.set(initialState);
	}, 1000);

	const clear = () => {
		dispatch(actions.clear);
	};
</script>

<h1>Grid System v2</h1>

<Canvas />
<Tools />



<button on:click={clear}>clear</button>

<h3>Highlights</h3>
<div>
	[{[...$highlightGrid]}]
</div>

<h3>Roads</h3>
<div>
	{[...$roadsGrid]}
</div>

<h3>Trees</h3>
<div>
	{[...$treesGrid]}
</div>

<h3>Houses</h3>
<div>
	{[...$housesGrid]}
</div>
