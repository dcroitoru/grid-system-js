<script>
	import { currentTool, tools } from './tools-system';
</script>

<h2>Tools</h2>

{#each Object.keys(tools) as tool}
	<label>
		<input type="radio" bind:group={$currentTool} name="currentTool" value={tool} />
		{tool}
	</label>
{/each}
