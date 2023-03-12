<script>
	import Grid from '../../components/Grid.svelte';
</script>

<div class="columns">
	<div>
		<h1>Roads Roads Roads</h1>
		<p>Drag to place roads</p>
	</div>
</div>

<Grid />

<style>
	.columns {
		display: grid;
		grid-template-columns: 1fr auto;
		margin-bottom: 20px;
	}
</style>
