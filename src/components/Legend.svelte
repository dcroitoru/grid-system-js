<div class="legend">
	<div class="line">
		<div class="cell road" />
		<span>Existing road</span>
	</div>

	<div class="line">
		<div class=" cell road-allow" />
		<span>New road allowed position</span>
	</div>

	<div class="line">
		<div class=" cell road-forbid" />
		<span>New road forbidden position</span>
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
