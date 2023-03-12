<script>
	import { colors } from './canvas';
	import { tools } from './tools-system';

	let c = colors;

	const createStyle = (tool) => {
		const text = tool === tools.house ? 'black' : 'white';
		const bg = c[tool];
		return `background-color: ${bg}; color: ${text};`;
	};
</script>

<div class="legend">
	<p class="title">Rules</p>

	<div class="line">
		<div class="cell" style={createStyle(tools.house)} />
		<span>
			<span style={createStyle(tools.house)}>[House]</span>
			can build over everything
		</span>
	</div>

	<div class="line">
		<div class="cell" style="background-color: {c.trees}" />
		<span>
			<span style={createStyle(tools.trees)}> [Trees] </span>
			cannot build over
			<span style={createStyle(tools.house)}>[House]</span>
			and
			<span style={createStyle(tools.road)}> [Road] </span>
		</span>
	</div>

	<div class="line">
		<div class="cell" style="background-color: {c.road}" />
		<span>
			<span style={createStyle(tools.road)}> [Road] </span>
			cannot build over 
			<span style={createStyle(tools.house)}>[House]</span>
			</span
		>
	</div>

	<div class="line">
		<div class="cell" style="background-color: {c.road}" />
		<span>
			<span style={createStyle(tools.road)}> [Road] </span>
			cannot build next to 3 other roads</span
		>
	</div>
</div>

<style>
	.legend {
		display: grid;
		grid-template-rows: auto;
		gap: 4px;
		background-color: aliceblue;
		border-radius: 4px;
		padding: 4px 10px;
		font-size: 12px;
	}

	.title {
		font-size: larger;
		font-weight: 400;
	}

	.cell {
		--cell-size: 20px;
		width: var(--cell-size);
		height: var(--cell-size);
	}

	.line {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10px;
	}
</style>
