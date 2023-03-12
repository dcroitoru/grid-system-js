<script>
	import { actions, dispatch } from './actions';
	import Canvas from './Canvas.svelte';
	import { highlightGrid, housesGrid, persistentGrid, roadsGrid, treesGrid } from './grid';
	import Tools from './Tools.svelte';
	import { gridSystem } from './grid-system';
	import Legend from './Legend.svelte';
	import Rules from './Rules.svelte';

	setTimeout(() => {
		// drawGrid();
		// const initialState = ['0-0', '1-0'];
		// roadsGrid.set(initialState);
	}, 1000);

	const clear = () => {
		console.log('should dispatch clear action');

		dispatch(actions.clear);
	};
</script>

<div class="columns">
	<div>
		<h1>Grid System v2</h1>
	</div>

	<Rules />
</div>
<Canvas />
<Tools />

<button on:click={clear}>clear</button>

<h3>Highlight</h3>
<div>
	[{[...$highlightGrid]}]
</div>

<h3>Persistent</h3>
<div>
	[{[...$persistentGrid]}]
</div>

<style>
	.columns {
		display: grid;
		grid-template-columns: 1fr auto;
		margin-bottom: 20px;
	}
</style>
